import { makeHtmlAttributes } from "@rollup/plugin-html";

export const generateHtmlPlugin = (htmlName) => {
  return {
    fileName: `${htmlName}.html`,
    template: ({ attributes, files, publicPath, title }) => {
      let scripts = [
        ...(files.js || []).filter((item) => item.name === htmlName),
      ];
      scripts = scripts
        .map(({ fileName }) => {
          const attrs = makeHtmlAttributes(attributes.script);
          return `<script src="${publicPath}${fileName}"${attrs}></script>`;
        })
        .join("\n");
      return `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>${title}</title>
            </head>
            <body>
              <div id="app"></div>
              ${scripts}
            </body>
          </html>`;
    },
  };
};
