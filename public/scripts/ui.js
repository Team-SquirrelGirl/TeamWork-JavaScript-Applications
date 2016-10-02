function clearContent(){
  $('.content').each(function(){
    this.style.display = 'none';
  });
}

function showOnlyThisId(id){
  clearContent();
  document.getElementById(id).style.display = '';
}
