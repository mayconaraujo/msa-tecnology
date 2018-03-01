/* JS FUNCTIONS */

/* Valida Campo Num�rico */
function mascaraNumero(e){
	var tecla=(window.event)?event.keyCode:e.which;

	if((tecla > 47 && tecla < 58))
		return true;
	else{
		if(tecla == 8 || tecla == 0)
			return true;
		else
			return false;
	}
}

/* Responder coment�rio */
function recomment(parent, html){
	if((parent != "")){
		html="<input type=\"hidden\" name=\"parentPid\" value=\""+parent+"\"><ul class='list-unstyled'><li>"+html;
		html+="</li><li><p><a href=\"#ancora_conteudo\" onClick=\"recomment('','&nbsp;');\">Clique aqui caso queira comentar o conte�do, e n�o mais o coment�rio</a></p></li>" + "</ul>";
		//location.hash="#ancora_conteudo";
	}

	$('#ancora_comentar_comentario').html(html);
	$('#ancora_comentar_comentario .btn').remove();
	$('#ancora_comentar_comentario .media-body').addClass('bg-info');
	$('#ancora_comentar_comentario .blog-entry').removeClass('col-md-offset-1');
}

/* Recupera valores da URL */
function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/* Remove espa�os */
function trim(text, inputName) {
	return text.replace(/^\s*/,"").replace(/\s*$/,"");
}

/* READY ACTIONS */
$(document).ready(function(){
	/* Trata Caracteres de URL */
	qs = new Array();
	variaveis = location.search.replace(/\x3F/,"").replace(/\x2B/g," ").split("&");
	if(variaveis != ""){
		for(i=0; i<variaveis.length; i++){
			nvar = variaveis[i].split("=");
			qs[nvar[0]] = unescape(nvar[1]);
		}
	}

	QueryString = function(variavel) {
		return qs[variavel];
	}

	/* Valida Coment�rio, Enviar Para Amigo e Comunicar Erro */
	$('#formComentario input[type="submit"], #formResposta input[type="submit"], #formComunicarErro button[type="submit"], #formEnviarEmail button[type="submit"]').on('click', function(e){
		e.preventDefault(e);

		var botao = $(this);

		var erro = false;
		var form = $(this).parents('form');

		var divmesg = form.find('.mensagemValidacao');
		var divlista = form.find('.mensagemValidacao ul');
		divlista.html('');

		$("input#recaptcha_response_field").addClass('validate[captcha]');

		form.find('[class^="validate"]').each(function(i){
			var rules = $(this).attr('class').split(' ')[0];
			rules = /validate\[(.*)\]/.exec(rules);
			rules = rules[1].split(/\[|,|\]/);

			if(textValidation($(this), rules, divlista)) {
				$(this).parents('.form-group').addClass('has-error');
				erro = true;
			} else {
				$(this).parents('.form-group').removeClass('has-error');
			}
		});

		if(!erro) {

			// Desabilita bot�o
			botao.attr('disabled', 'disabled');
			botao.css('cursor', 'default');

			divmesg.slideUp('normal', function(){
				$.ajax({
					type: "GET",
					data: form.serialize(),
					url: form.attr('action'),
					dataType: 'jsonp',
					crossDomain: true,
					jsonp: false,
					jsonpCallback: 'retornoJson',
					success: function(data) {
						if(data.retorno == 'captchaErro'){
							// Habilita bot�o
							botao.removeAttr('disabled');
							botao.css('cursor', 'pointer');

							divlista.html('<li>O c&oacute;digo de verifica&ccedil;&atilde;o est&aacute; incorreto. Por favor, digite-o novamente.</li>');
							divmesg.slideDown('normal');
							$('#recaptcha_response_field').addClass('erro');
							Recaptcha.reload();
						} else if(data.retorno == 'erro'){
							// Habilita bot�o
							botao.removeAttr('disabled');
							botao.css('cursor', 'pointer');
							$.fancybox({
								'content'	 : '<div class="alert alert-error text-center LffightBoxAtencao"><h4><i class="fa fa-warning"></i><xsl:value-of select="msg" disable-output-escaping="yes"/> Ocorreu um erro ao enviar o e-mail! Tente novamente mais tarde.</h4></div>',
								'onComplete' : function() {
													$('#fancybox-content').css('border', 'none');
													$('#fancybox-outer').css('background-color', '#feeed9');
													//setTimeout(function(){
														//$.fancybox.close();
													//}, 3500);
											   },
								'onCleanup'	: function() {
									var cur = window.location.href;
										if(cur.indexOf('?') >= 0){
											cur = cur.split('?')[0];
										}
									window.location.href=cur;
								}
							});
						} else if(data.retorno == 'sucesso') {
							if( form.attr('name') == 'formComentario' ){
								// Habilita bot�o
								botao.removeAttr('disabled');
								botao.css('cursor', 'pointer');

								window.location.href = data.url;
							}else{
								$.fancybox({
									'content'    : '<div class="alert alert-success text-center LightBoxSucesso"><h4><i class="fa fa-check"></i> E-mail enviado com sucesso!</h4></div>',

									'onComplete' : function() {
														$('#fancybox-content').css('border', 'none');
														$('#fancybox-outer').css('background-color', '#e9f8de');
														setTimeout(function(){
															$.fancybox.close();
														}, 3500);
												   },
									'onCleanup'	: function() {
										var cur = window.location.href;
											if(cur.indexOf('?') >= 0){
												cur = cur.split('?')[0];
											}
										window.location.href=cur;
									}
								});

								// Habilita bot�o
								botao.removeAttr('disabled');
								botao.css('cursor', 'pointer');
							}
						}
					}
				});
			});
		} else {
			divmesg.slideDown('normal');
		}
	});

	/* Valida Texto de Coment�rios */
	textValidation = function(field, rules, msgBox){
		var erro = false;
		var required = false;

		for(i=0; i<rules.length; i++){
			switch(rules[i]){
				case 'required':
					if(!field.val()) {
						msgBox.append('<li>"' + field.parents('.form-group').find('span').text() + '" &eacute; obrigat&oacute;rio;</li>');
						erro = required = true;
					}
				break;
				case 'captcha':
					if(!field.val()) {
						msgBox.append('<li>"Captcha" &eacute; obrigat&oacute;rio;</li>');
						erro = true;
					}
				break;
				case 'email':
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if( !filter.test(field.val()) && field.val() ) {
						msgBox.append('<li>"' + field.parents('.form-group').find('span').text() + '" est&aacute; incorreto;</li>');
						erro = true;
					}
				break;
				case 'url':
					var filter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
					if( !filter.test(field.val()) && field.val() ) {
						msgBox.append('<li>"' + field.parents('.form-group').find('span').text() + '" est&aacute; incorreto (http://www.exemplo.com.br/);</li>');
						erro = true;
					}
				break;
			}
			if(erro)
				break;
		}
		return erro;
	}

	/* Exibe Mensagem LightBox */
	showReturnMsg = function(type, title, msg){
		$.fancybox({
			'content'		: '<div class="' + type + '">' + title + ' &nbsp; ' + msg + '</div>',

			'onComplete'    : function() {

				$('#fancybox-content').css('border', 'none');

				if(type == 'LightBoxSucesso'){
					$('#fancybox-outer').css('background-color', '#e9f8de');
				}
				else if(type == 'LightBoxErro'){
					$('#fancybox-outer').css('background-color', '#FFE1D9');
				}
				else{
					$('#fancybox-outer').css('background-color', '#feeed9');
				}

				setTimeout(function(){
					$.fancybox.close();
				}, 3500);
			},
			'onCleanup'	: function() {
				var cur = window.location.href;
					if(cur.indexOf('?') >= 0){
						cur = cur.split('?')[0];
					}
				window.location.href=cur;
			}
		});
	}

	/* Trata Mesangens de LightBox */
	if(document.location.href.indexOf('?envCom') >= 0) {
		showReturnMsg('LightBoxSucesso', 'Coment&aacute;rio enviado com sucesso.', '');
	}
	else if(document.location.href.indexOf('?erroEnvCom') >= 0){
		showReturnMsg('LightBoxErro', 'N&atilde;o foi poss&iacute;vel enviar seu coment&aacute;rio.', '');
	}
	else if(document.location.href.indexOf('?remCom') >= 0){
		showReturnMsg('LightBoxSucesso', 'Notifica&ccedil;&atilde;o removida com sucesso.', '');
	}
	else if(document.location.href.indexOf('?erroRemCom') >= 0){
		showReturnMsg('LightBoxErro', 'N&atilde;o foi poss&iacute;vel remover a notifica&ccedil;&atilde;o do coment&aacute;rio.', '');
	}
	else if(document.location.href.indexOf('?errorAccept') >= 0){
		showReturnMsg('LightBoxAtencao', 'Voc� deve aceitar o termo de compromisso.', '');
	}
	else if(document.location.href.indexOf('?error') >= 0){
		showReturnMsg('LightBoxErro', 'N&atilde;o foi poss&iacute;vel enviar o coment&aacute;rio.', '');
	}

	/* Trata limite de caracteres para mensagem */
	$('#formComunicarErro, #formEnviarEmail').find('textarea').keyup(function(e){
		if($(this).val().length > 600) {
			$(this).val($(this).val().substr(0, 600));
		}
	});

	/* Remove Estilo de erro */
	$('#formComentario input[type="text"], #formComentario textarea, #formComentario select, #formEnviarEmail input[type="text"], #formEnviarEmail textarea, #formComunicarErro input[type="text"], #formComunicarErro textarea').change(function() {
		if(trim($(this).val()) != ''){
			$(this).parents('.form-group').removeClass('has-error');
		}
	});

	/* Remove Estilo de form em lightbox */
	$('#fancybox-close').on('click', function(){
		$('#formEnviarEmail .form-group').removeClass('has-error');
		$('#formComunicarErro .form-group').removeClass('has-error');
	});

	/* Lightbox Email */
	$(".mail-link").fancybox({
		'onStart'    : function(){
					$('#fancybox-outer').css('background-color', '#ffffff');
					$('#formEnviarEmail').find('input[type="submit"]').fadeTo(0,1);
					$('#formEnviarEmail').find('.mensagemValidacao').hide();
					$('#formEnviarEmail .erro').removeClass('erro');
					$('#formEnviarEmail').each(function(){
							$(this).removeClass('erro');
							this.reset();
					});
				},
		'onComplete' : function(){
					$('#fancybox-content').css('border-width', '0px');
		}
	});

	/* Lightbox Imprimir */
	$('.print-link').fancybox({
		'width'				: 750,
		'height'			: 500,
		'type'				: 'iframe',
		'onStart'        	: function(){
								$('#fancybox-outer').css('background-color', '#ffffff');
								$('#fancybox-content').css('border', 'solid 10px #ffffff');
							},
		'onComplete'		: function(){
								var conteudo = $('.title-blog,.blog, #cases, .galeria-interna').clone();

								setTimeout(function(){
											$('#fancybox-frame').contents().find('.middle').html(conteudo);
											$('#fancybox-frame').contents().find('.middle').find('a').bind('click', function(e){ e.preventDefault(); });
											$('#fancybox-frame').contents().find('.bottom-print a').attr('href', location.href).html(location.href);
										}, 800);
							}
	});

	/* Lightbox Comunicar Erro */
	$(".erro-link").fancybox({
		'onStart'    : function(){
					$('#fancybox-outer').css('background-color', '#ffffff');
					$('#formComunicarErro').find('button[type="submit"]').fadeTo(0,1);
					$('#formComunicarErro').find('.mensagemValidacao').hide();
					$('#formComunicarErro .erro').removeClass('erro');
					$('#formComunicarErro').each(function(){
							$(this).removeClass('erro');
							this.reset();
					});
				},
				'onComplete' : function(){
							$('#fancybox-content').css('border-width', '0px');
				}
	});

	/* Foto interna */
	var imageInterna = $('.news-interna img').length;

	if(imageInterna != 0){
		var tableImg = $('.tableImg').length;

		if(tableImg != 0){
			$('.tableImg').addClass('pull-left');

			$('.news-interna .tableImg').each(function(){
				var image = $(this).find('.imgTable').clone();

				$(this).find('.galeriaFotos').empty();
				$(this).find('.galeriaFotos').append(image);

				var width = $(this).find('.imgTable').width();

				$(this).css('width', width);
			});
		}

		$('.news-interna img').not('.imgTable').each(function(){
			var imageUrl = $(this).attr('src');

			var openAnchor = '<a class="galeriaFotos pull-left" rel="group" href="' + imageUrl + '"></a>';

			$(this).wrap(openAnchor);
		});
	}

	/* Lightbox Foto */
	$('.galeriaFotos').attr('data-lightbox', 'gallery-image');
})
