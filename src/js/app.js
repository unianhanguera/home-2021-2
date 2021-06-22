import '../scss/main.scss';

const menuButton = document.querySelector('.menu-mobile_icon_input');

menuButton.addEventListener('click', () => {

  if(menuButton.checked){
    mostrarMenuMobile();
  }else{
    ocultarMenuMobile();
  }
});

const mostrarMenuMobile = () => {
  document.querySelector('header .container .topbar .main-menu_main-list').style.display = 'flex';
}

const ocultarMenuMobile = () => {
  document.querySelector('header .container .topbar .main-menu_main-list').style.display = 'none';
}

/**
 * Nesta parte, irei renderizar a lista de links
 * se existir informações gravadas sobre ela no localstorage, estas serão
 * consideradas na renderização
 */

const listaDeLinks = document.querySelector('.lista-de-links');
const arrayLinks = [
  {linkSlug: "email-institucional", linkScore: 10, linkURL: "https://unigoias.com/tutorial-webmail/?sou=aluno", linkLabel: "Email Institucional"},
  {linkSlug: "porta-do-aluno", linkScore: 15, linkURL: "https://unigoias.com/tutorial-webmail/?sou=aluno", linkLabel: "Portal do Aluno"},
  {linkSlug: "porta-educacional", linkScore: 3, linkURL: "https://unigoias.com/tutorial-webmail/?sou=aluno", linkLabel: "Portal Educacional"},
  {linkSlug: "seja-um-polo", linkScore: 0, linkURL: "https://unigoias.com/polos/parceiros/", linkLabel: "Seja um Polo"},
  {linkSlug: "colacao-de-grau", linkScore: 0, linkURL: "https://unigoias.com/colacao", linkLabel: "Colação de Grau"},
  {linkSlug: "manuais-sapc", linkScore: 0, linkURL: "https://anhanguera.edu.br/sapc/manual-de-elaboracao-de-trabalhos/", linkLabel: "Manuais SAPC"},
  {linkSlug: "eventos", linkScore: 0, linkURL: "https://unigoias.com/eventos/", linkLabel: "Eventos"},
  {linkSlug: "certificados-eventos", linkScore: 0, linkURL: "https://anhanguera.edu.br/certificados/", linkLabel: "Emitir Certificado de Eventos"},
  {linkSlug: "corpo-docente", linkScore: 0, linkURL: "https://anhanguera.edu.br/cursos/", linkLabel: "Corpo docente - Professores"},
  {linkSlug: "matriz-curricular", linkScore: 0, linkURL: "https://anhanguera.edu.br/cursos/", linkLabel: "Matriz Curricular do Curso"},
  {linkSlug: "plantao-covid", linkScore: 0, linkURL: "https://www.unigoias.com/plantaocovid/", linkLabel: "Plantão COVID-19"},
  {linkSlug: "prouni", linkScore: 0, linkURL: "https://anhanguera.edu.br/prouni/", linkLabel: "Informações Prouni"},
  {linkSlug: "laboratorios", linkScore: 0, linkURL: "https://anhanguera.edu.br/o-uni-anhanguera/laboratorios/", linkLabel: "Laboratórios"},
  {linkSlug: "calendario-presencial", linkScore: 0, linkURL: "https://anhanguera.edu.br/documentos/calendario-academico-2021-1.pdf", linkLabel: "Calendário Acadêmico - Ensino Presencial"},
  {linkSlug: "calendario-ead", linkScore: 0, linkURL: "https://anhanguera.edu.br/ead/calendario-academico-ead/", linkLabel: "Calendário Acadêmico - EaD"},
];

window.onload = () => {

  /**
   * Irá renderizar os links conforme localstorage
   */
  renderizarLinks(atualizarArrayDeLinks(arrayLinks));
}

const atualizarArrayDeLinks = (arrayLinks) => {
  /**
   * Irá verificar se existe items no localstorage para ordenar a lista de links
   */
  let newArray = [];
  arrayLinks.forEach(element => {
     newArray.push({
      linkSlug: element.linkSlug, 
      linkScore: parseInt(localStorage.getItem(element.linkSlug)) || 0, 
      linkURL: element.linkURL, 
      linkLabel: element.linkLabel
    });
  });
  /**
   * retorará um array conforme os dados guardados no localstorage
   */
  return newArray;

}

const acessarLink = (slug, linkURL) => {
  //irei incrementar o score do link no localstorage, caso já tenha sido gravado
  let scoreGuardado = (parseInt(localStorage.getItem(slug) ) || 0) + 1;

  console.log(scoreGuardado);
  localStorage.setItem(slug, scoreGuardado);

  //agora irei redirecionar a pessoa para o link clicado
  window.location.href = linkURL;
}

const renderizarLinks = (array) => {
  let arrayLinksOrdenados = array.sort((a, b) => {
    if (a.linkScore > b.linkScore) {
      return -1;
    }else{
      return 1;
    }
  });
  console.log(arrayLinksOrdenados)
  let markup = ``;
  arrayLinksOrdenados.forEach(element => {
    markup += `
    <label class="lista-de-links_item ${(element.linkScore < 3)?'access-link-3':((element.linkScore <5)?'access-link-2':'access-link-1')}" id="${element.linkSlug}">
      <span onclick="acessarLink('${element.linkSlug}', '${element.linkURL}')">${element.linkLabel}</span>
    </label>
  `;
  });

  listaDeLinks.innerHTML += markup;
}