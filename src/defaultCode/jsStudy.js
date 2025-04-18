export const jsStudyCode = {
  html: ` <button class="ai_button">
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41724 3L9.29224 7.125L13.4172 9L9.29224 10.875L7.41724 15L5.54224 10.875L1.41724 9L5.54224 7.125L7.41724 3ZM7.41724 6.6225L6.66724 8.25L5.03974 9L6.66724 9.75L7.41724 11.3775L8.16724 9.75L9.79474 9L8.16724 8.25L7.41724 6.6225ZM14.9172 6.75L13.9722 4.695L11.9172 3.75L13.9722 2.8125L14.9172 0.75L15.8547 2.8125L17.9172 3.75L15.8547 4.695L14.9172 6.75ZM14.9172 17.25L13.9722 15.195L11.9172 14.25L13.9722 13.3125L14.9172 11.25L15.8547 13.3125L17.9172 14.25L15.8547 15.195L14.9172 17.25Z" fill="#2B67FF" />
  </svg>
  Text
</button>
<br>
<button class="darkmode">Darkmode</button>`,

  css: `*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  flex-direction: column;
}
body.theme-dark1 {
  background: #16191c;
}

/* ai button */
.ai_button {
  background-image: linear-gradient(to bottom right, #ccf4fd, #ecccfc);
  border: none;
  height: 32px;
  padding: 0 16px 0 11px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 2px;
  color: #2b67ff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.56px;
  text-transform: uppercase;
  position: relative;
}
.ai_button:hover {
  background-image: linear-gradient(to bottom right, #a6ecfc, #dfa6fa);
}
.ai_button::after {
  content: "";
  position: absolute;
  left: -2px;
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  border-radius: 4px;
  background: linear-gradient(
    to bottom right,
    #02cbf7 16.27%,
    #2b67ff 53.33%,
    #a402f1 87.54%
  );
  z-index: -1;
}
.theme-dark1 .ai_button {
  background-image: linear-gradient(to bottom right, #104e5e, #262860, #40125c);
  color: white;
}
.theme-dark1 .ai_button:hover {
  background-image: linear-gradient(to bottom right, #0b778f, #343292, #610d8d);
}
.theme-dark1 .ai_button svg path {
  fill: #ffffff;
}
`,

  js: `document.querySelector(".darkmode").addEventListener("click", function () {
  document.body.classList.toggle("theme-dark1");
})
`,
};
