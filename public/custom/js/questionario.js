var emailOK = true;
var txtEmail = "";
var cepOK = true;
var txtCEP = "";
var cpfOK = true;
var txtCPF = "";
var cnpjOK = true;
var txtCNPJ = "";

// valida campos requeridos do formul�rio
$('#frmQuestionario .btn-u').on('click', function(e){
	e.preventDefault();

	var msg = "";
	var erro = false;

	//var formulario = $('#frmQuestionario');
	var divmesg = $('#divRequired');
	var divlista = $('#msgAtencao ul');
	divlista.html('');

	for(i in obrigatorios){
		if(obrigatorios[i] != '') {
			if(!validateRequired(eval('form.' + obrigatorios[i]))) {
				msg = msg + '<li>"' + returnId(form.elements[obrigatorios[i]]) + '" &eacute; obrigat&oacute;rio</li>';

				if (eval('form.' + obrigatorios[i]).style != null)
				{
					eval('form.' + obrigatorios[i]).style.borderColor="#A94442";
					var classAtual = eval('form.' + obrigatorios[i]).className;
					if (classAtual.indexOf('camposFormErro') == -1)
						eval('form.' + obrigatorios[i]).className = classAtual + " camposFormErro";
				}

				erro = true;
			}
			else
			{
				if (eval('form.' + obrigatorios[i]).style != null)
				{
					eval('form.' + obrigatorios[i]).style.borderColor="#C8C8C8";
					var classAtual = eval('form.' + obrigatorios[i]).className;
					eval('form.' + obrigatorios[i]).className = classAtual.replace(/camposFormErro/g, "");
				}
			}
		}
	}

	if(!emailOK && txtEmail != ""){
		msg = msg + '<li>"E-mail" inv&aacute;lido</li>';
		erro = true;
	}

	if(!cepOK && txtCEP != ""){
		msg = msg + '<li>"CEP" inv&aacute;lido</li>';
		erro = true;
	}

	if(!cpfOK && txtCPF != ""){
		msg = msg + '<li>"CPF" inv&aacute;lido</li>';
		erro = true;
	}

	if(!cnpjOK && txtCNPJ != ""){
		msg = msg + '<li>"CNPJ" inv&aacute;lido</li>';
		erro = true;
	}

	/*if(!$('#recaptcha_response_field').val()){
		msg = msg + '<li>"C�digo verificador" � obrigat�rio</li>';
		$('#recaptcha_response_field').addClass('erro');
		erro = true;
	}*/

	if(!erro){
		// Desabilita bot�o
		//botao = $(this);
		//botao.attr('disabled', 'disabled');
		//botao.css('background-color', '#449FDC');
		//botao.css('cursor', 'default');
		//botao.parent('p').append('<img src=\"img/loader.gif\" alt=\"Carregando\" class="loader-form" />');

		$('#frmQuestionario').submit();
		return true;
	}
	else{
		divlista.html(msg);
		divmesg.slideDown('normal');
		$('html, body').animate({ scrollTop: $('#divRequired').offset().top }, 400);

		return false;
	}
});

function returnId(field) {
	if (field.length > 0)
	{
		if (field.item(1).type == "radio" || field.item(1).type == "checkbox")
			return field.item(1).id;
	}
	field.style.border = "1px solid #EB613D";
	//field.style.background = 'none';
	return field.id;
}

function startDivSucesso(msg)
{
	alert(msg);
}


// velida se um campo
function validateRequired(field) {

	// valida Text e Area
	if (field.type == "text" || field.type == "textarea") {
		if(trim(field.value) == '')
			return false;
	}

	// valida Combo
	else if (field.type == "select-one") {
		if(field.selectedIndex == 0)
			return false;
	}

	// valida List
	else if (field.type == "select-multiple") {
		var selecteds = 0
		for(var i = 0; i != field.options.length; i++)
			if(field.options[i].selected)
				selecteds++;
		if(selecteds == 0)
			return false;
	}

	// valida Checkbox e Radio com v�rias op��es
	else if (field.type == undefined) {
		if (field[0].type == 'radio' || field[0].type == 'checkbox') {
			var checkeds = 0
			for(var i = 0; i != field.length; i++) {
				if (field[i].checked)
					checkeds++;
			}
			if(checkeds == 0)
				return false;
		}
	}

	return true;
}

// remove espa�os.
function trim(text, inputName) {
	return text.replace(/^\s*/,"").replace(/\s*$/,"");
}

// valida senha ao digitar
function validatePassword(event, password, password_temp, inputName) {

	var fields = document.getElementsByName(inputName);

	if (password_temp != password)
		fields[0].style.color = "rgb(255, 99, 96)";

	else
		fields[0].style.color = " ";

}

// valida endere�o de email ao digitar
function validateEmail(email, inputName) {
	txtEmail = trim(email);
	var expressao=new RegExp("^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$");

	if(expressao.test(email))
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName){
				fields[i].style.color = " ";
				emailOK = true;
			}
	}
	else
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName){
				fields[i].style.color = "rgb(255, 99, 96)";
				emailOK = false;
			}
	}
}

// valida numero de cep (NNNNN-NNN)
function validateCep(event, cep, inputName) {
	txtCEP = trim(cep);
	var expressao=new RegExp("^[0-9]{5}-[0-9]{3}$");

	var lngCaracter = 0;

	if(event.keyCode){
		lngCaracter = event.keyCode;
	}
	else if(event.which){
		lngCaracter = event.which;
	}
	else if(event.charCode){
		lngCaracter = event.charCode;
	}
	else{
		lngCaracter = void(0);
	}
	// somente n�meros e backspace
	if(lngCaracter >= 48 && lngCaracter <= 57 || lngCaracter == 8)
	{
		// se o caracter for diferente de backspace
		if(lngCaracter != 8){

			if(cep.length >= 9)
				return false;

			if (cep.length == 5)
				document.getElementsByName(inputName)[0].value = cep + '-';
		}

		cep = document.getElementsByName(inputName)[0].value + String.fromCharCode(lngCaracter);

		if (expressao.test(cep))
		{
			var fields = document.getElementsByName(inputName);
			for (var i=0; i<fields.length; fields++)
				if (fields[i].name == inputName){
					fields[i].style.color = " ";
					cepOK = true;
				}
		}
		else
		{
			var fields = document.getElementsByName(inputName);
			for (var i=0; i<fields.length; fields++)
				if (fields[i].name == inputName){
					fields[i].style.color = "rgb(255, 99, 96)";
					cepOK = false;
				}
		}

	}
	else{
		return false;
	}
}

// valida numero de telefone
function validateTelefone(event, fone, inputName) {
	var expressao = fone.match(/^(\(?11\)? ?9(5[0-9]|6[0-9]|7[01234569]|8[0-9]|9[0-9])[0-9]{1})/g) ? '(00) 00000-0000' : '(00) 0000-0000';

	$(".telefone").mask(expressao);

	// testa a palavra completa aqui
	if(expressao)
	{
		if (document.getElementsByName(inputName)[0].name == inputName){
			document.getElementsByName(inputName)[0].style.color = " ";
		}
	}
	else
	{
		if (document.getElementsByName(inputName)[0].name == inputName){
			document.getElementsByName(inputName)[0].style.color = "rgb(255, 99, 96)";
		}
	}

	/*var expressao = new RegExp("^\\([0-9]{2}\\)\\s[0-9]{4}\\-[0-9]{4}$");
	var lngCaracter = 0;

	if(event.keyCode){
		lngCaracter = event.keyCode;
	}
	else if(event.which){
		lngCaracter = event.which;
	}
	else if(event.charCode){
		lngCaracter = event.charCode;
	}
	else{
		lngCaracter = void(0);
	}

	// somente n�meros e backspace
	if(lngCaracter > 47 && lngCaracter < 58 || lngCaracter == 8)
	{
		// se o caracter for diferente de backspace
		if(lngCaracter != 8){

			if(fone.length >= 14)
				return false;

			if (fone.length == 0)
				document.getElementsByName(inputName)[0].value = '(' + fone;

			if (fone.length == 3)
				document.getElementsByName(inputName)[0].value = fone + ') ';

			if (fone.length == 9)
				document.getElementsByName(inputName)[0].value = fone + '-';
		}

		fone = document.getElementsByName(inputName)[0].value + String.fromCharCode(lngCaracter);

		// testa a palavra completa aqui
		if(expressao.test(fone))
		{
			if (document.getElementsByName(inputName)[0].name == inputName)
				document.getElementsByName(inputName)[0].style.color = "black";
		}
		else
		{
			if (document.getElementsByName(inputName)[0].name == inputName)
				document.getElementsByName(inputName)[0].style.color = "red";
		}

	}
	else{
		return false;
	}*/

}

// valida cpf ao digitar
function validateCpf(cpf, inputName) {
	txtCPF = trim(cpf);
	if (isCpf(cpf) == true)
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName)
			{
				fields[i].style.color = " ";
				fields[i].value = formatCpfCnpj(cpf, true, false);
				cpfOK = true;
			}
	}
	else
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName){
				fields[i].style.color = "rgb(255, 99, 96)";
				cpfOK = false;
			}
	}

}

// valida cnpj ao digitar
function validateCnpj(cnpj, inputName) {
	txtCNPJ = trim(cnpj);
	if (isCnpj(cnpj) == true)
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName)
			{
				fields[i].style.color = " ";
				fields[i].value = formatCpfCnpj(cnpj, true, true);
				cnpjOK = true;
			}
	}
	else
	{
		var fields = document.getElementsByName(inputName);
		for (var i=0; i<fields.length; fields++)
			if (fields[i].name == inputName){
				fields[i].style.color = "rgb(255, 99, 96)";
				cnpjOK = false;
			}
	}
}

// esconde ou mostra as perguntas filhas
function showHide (pid, value)
{
	var questionId = 'f'+pid;
	if (document.getElementsByName(questionId).type != "checkbox")
	{
		var x = document.getElementsByTagName('table');
		for (var i=0; i < x.length; i++)
		{
			if (x[i].id.substring(0, x[i].id.lastIndexOf('_')) == 'table_'+pid)
				if (x[i].id.substring(x[i].id.lastIndexOf('_')+1, x[i].id.length) == value)
				{
					x[i].style.display = '';
				}
				else
				{
					x[i].style.display = 'none';
				}
		}
	}
	else
	{
		var x = document.getElementsByName(questionId);
		for (var i=0; i < x.length; i++)
		{
			var tableId = 'table_'+pid+'_'+value;
			var children = document.getElementById(tableId);
			if (x[i].value == value && children)
			{
				if (x[i].checked)
				{
					children.style.display = '';
				}
				else
				{
					children.style.display = 'none';
				}
			}
		}
	}
}

function showHideCheck (pid, value)
{
	var questionId = 'f'+pid;

	var x = document.getElementsByName(questionId);

	for (var i=0; i < x.length; i++)
	{
		var tableId = 'table_'+pid+'_'+value;
		var children = document.getElementById(tableId);

		if (x[i].value == value && children)
		{
			if (x[i].checked)
			{
				children.style.display = '';
			}
			else
			{
				children.style.display = 'none';
			}
		}
	}
}
