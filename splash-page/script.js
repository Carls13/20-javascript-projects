const { body } = document;

function changeBackground(number) {
  let previousBackground = body.className;
  body.className = "";
  if (previousBackground != `background-${number}`) {
    body.classList.add(`background-${number}`);
  }
}
