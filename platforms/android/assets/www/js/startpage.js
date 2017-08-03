function sign_in() {
  var $login_form=$('#login_form').addClass('display');
  setTimeout(function() {
    $login_form.addClass('show');
  });

  document.getElementById('button_div').style.display='none';
};

function log_in() {
  user=document.getElementById('username').value;
  password=document.getElementById('password').value;
  if (user!="" && password!="") {
    document.getElementById('start_section').style.display='none';
    document.getElementById('map_section').style.display='block';
  }
  map._onResize();
}

function register() {
  document.getElementById('start_section').style.display='none';
  document.getElementById('regiter_section').style.display='block';
  document.getElementById('firstname').value="";
  document.getElementById('lastname').value="";
  document.getElementById('studentnumber').value="";
  document.getElementById('passwordregister').value="";
}

function register_done() {
  first_name=document.getElementById('firstname').value;
  second_name=document.getElementById('lastname').value;
  student_number=document.getElementById('studentnumber').value;
  password=document.getElementById('passwordregister').value;
  if (first_name!="" && second_name!="" && student_number!="" && password!="") {
    document.getElementById('regiter_section').style.display='none';
    document.getElementById('start_section').style.display='block';
  }
}

function back_bttn() {
  document.getElementById('regiter_section').style.display='none';
  document.getElementById('start_section').style.display='block';
}

function submit_element() {
  type_element=document.getElementById('typeelement').value;
  if (type_element!="") {
    document.getElementById('map_section').style.display='block';

    map.removeLayer(marker);
  }
  x=0;
}
