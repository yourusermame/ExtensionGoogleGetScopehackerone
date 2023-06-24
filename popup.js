chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    code: `
      var elementosStrong=document.querySelectorAll('strong[title]');
      var urlsElegibles=[];
      for(var i=0;i<elementosStrong.length;i++){
        var elemento=elementosStrong[i];
        var url=elemento.textContent.trim();
        var columnaEligible=obtenerColumnaEligible(elemento);
        if(columnaEligible&&columnaEligible.querySelector('.daisy-text--green')){
          urlsElegibles.push(url);
        }
      }
      var textarea=document.createElement('textarea');
      textarea.value=urlsElegibles.join('\\n');
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Las URLs elegibles se han copiado en el portapapeles.');
      function obtenerColumnaEligible(elementoStrong){
        var fila=elementoStrong.closest('.daisy-table__row');
        if(fila){
          var columnas=fila.querySelectorAll('.daisy-table__cell');
          if(columnas.length>=5){
            return columnas[4];
          }
        }
        return null;
      }
    `
  });
});
