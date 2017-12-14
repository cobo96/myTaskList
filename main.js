const electron = require('electron');
const path = require('path');
const url = require('url');

//electron submodules
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

let mainMenu;
let mainWindow;
let addWindow;

app.on('ready', () => {
    //test
    //console.log('Up and going');

    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        title:'To-Do List'
    });
    
    const menu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(menu);
    
    //mainWindow.loadURL('file://${__dirname}/mainWindow.html');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes:true
    }))

    mainWindow.on('closed', _=> {
      app.quit();
      //console.log('Going down');
    });
  });

  function createAddWindow(){

    //test
    //console.log('Up and going');
    addWindow = new BrowserWindow({
        width: 200, 
        height: 300,
        title: 'Add New Task'
    });
    
    const menu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(menu);

    //addWindow.loadURL('file://${__dirname}/addWindow.html');
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes:true
    }))

    addWindow.on('closed', function(){
        addWindow = null;
        //console.log('Going down');
    });
  }
  
  ipcMain.on('item:add', function(e, item){
      //test
      //console.log(item);
      mainWindow.webContents.send('item:add', item)
      addWindow.close();
  })

const mainMenuTemplate = [
    {label: "File", 
     submenu:[
         {
             label: 'Open'
         }
     ],
     label: "file",
     submenu:[
         {
             label:'Add Item',
             click(){
                 createAddWindow();
             }
         },
         {
             type:'separator'
         },
         {
             label:'Clear TaskList',
             click(){
                mainWindow.webContents.send('item:clear');
             }
         },
         {
             label:'Exit TaskList',
             click: _=>{
                 app.quit()
             },
             accelerator:'Ctrl+Q'}
     ]
   }
]

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }
  ipcMain.on('addTask', (ent, arg) =>{
    createAddWindow();
});


ipcMain.on('item:clear', (ent, arg) =>{
    mainWindow.webContents.send('item:clear');
});

ipcMain.on('app:close', (ent, arg) => {
    app.quit();
});