module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          //"git clone https://github.com/facebookresearch/chameleon app",
          "git clone https://github.com/peanutcocktail/chameleon app",
        ]
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/data"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git clone --depth 1 https://huggingface.co/cocktailpeanut/noelemahc data"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install -e ."
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "../../../env",                // Edit this to customize the venv folder path
        path: "app/chameleon/viewer/backend",                // Edit this to customize the path to start the shell from
        message: [
          "pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/chameleon/viewer/frontend",                // Edit this to customize the path to start the shell from
        message: [
          "npm install"
        ]
      }
    },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
//    {
//      method: "fs.link",
//      params: {
//        venv: "app/env"
//      }
//    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
