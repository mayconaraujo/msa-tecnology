$(document).ready(function(){

function QueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* --- >>> FUNCOES DE LISTAGEM <<< --- */
	$('.inputPaginacaoListagem').bind('keyup', function(e){
		if(e.keyCode == 13) {
			if( (parseInt($(this).val()) > 0) && (parseInt($('.paginasPaginacaoListagem:eq(0)').val()) >= parseInt($(this).val())) ) {
				var URL = window.location.href;
				if(URL.indexOf('&search') >= 0){
					var tmp = URL.split('&');
					for(i = 0; i < tmp.length ; i++){
						if(tmp[i].indexOf('search=') >= 0){
							location.href = "http://" + location.host + location.pathname + '?componentPid=' + $('.componentPid:eq(0)').val() + '&pageNumber=' + $(this).val() + '&groupPid=' + ($('.selectGrupoListagem:eq(0)').val() ? $('.selectGrupoListagem:eq(0)').val() : '0') + $('.selectOrdenacaoListagem:eq(0)').val() + '&' + tmp[i];
						}
					}
				}
				//location.href = "http://" + location.host + location.pathname + '?componentPid=' + $('.componentPid:eq(0)').val() + '&pageNumber=' + $(this).val() + '&groupPid=' + ($('.selectGrupoListagem:eq(0)').val() ? $('.selectGrupoListagem:eq(0)').val() : '0') + $('.selectOrdenacaoListagem:eq(0)').val();
			} else {
				$('.inputPaginacaoListagem').val(QueryString('pageNumber'));
			}
		}
	});
	document.body.innerHTML = document.body.innerHTML.replace(/ordem=/g, 'sort=');

	$('.selectGrupoListagem').bind('change', function(e){
		location.href = "http://" + location.host + location.pathname + '?componentPid=' + $('.componentPid:eq(0)').val() + '&pageNumber=1&groupPid=' + ($('.selectGrupoListagem:eq(0)').val() ? $('.selectGrupoListagem:eq(0)').val() : '0') + $('.selectOrdenacaoListagem:eq(0)').val();
	});
	$('.selectOrdenacaoListagem').bind('change', function(e){
		var URL = window.location.href;
		if(URL.indexOf('&search') >= 0){
			var tmp = URL.split('&');
			for(i = 0; i < tmp.length ; i++){
				if(tmp[i].indexOf('search=') >= 0){
					location.href = "http://" + location.host + location.pathname + '?componentPid=' + $('.componentPid:eq(0)').val() + '&pageNumber=' + $('.inputPaginacaoListagem:eq(0)').val() + '&groupPid=' + ($('.selectGrupoListagem:eq(0)').val() ? $('.selectGrupoListagem:eq(0)').val() : '0') + $('.selectOrdenacaoListagem:eq(0)').val() + '&' + tmp[i];
				}
			}
		}
		else
			location.href = "http://" + location.host + location.pathname + '?componentPid=' + $('.componentPid:eq(0)').val() + '&pageNumber=' + $('.inputPaginacaoListagem:eq(0)').val() + '&groupPid=' + ($('.selectGrupoListagem:eq(0)').val() ? $('.selectGrupoListagem:eq(0)').val() : '0') + $('.selectOrdenacaoListagem:eq(0)').val();
	});
	
	
	$('.selectGrupoListagem:eq(0) option').each(function(){
		if($(this).attr('value') == QueryString('groupPid'))
			$(this).attr('selected', 'selected');
	});
	
	$('.selectOrdenacaoListagem option').each(function(){
		if($(this).attr('value') == '&sort=' + QueryString('sort') + '&typeOrder=' + QueryString('typeOrder'))
			$(this).attr('selected', 'selected');	
	});
/* --- >>> FUNCOES DE LISTAGEM <<< --- */
});
