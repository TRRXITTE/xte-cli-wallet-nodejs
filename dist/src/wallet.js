!/usr/bin / env;
node;
import fs from 'fs';
const homedir = require('os').homedir();
const directories = [homedir + '/.traaitt-wallet', homedir + '/.traaitt-wallet/logs', homedir + '/.traaitt-wallet/wallets'];
directories.forEach(function (dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});
const [programDirectory, logDirectory, walletDirectory] = directories;
let walletLogStream = fs.createWriteStream(logDirectory + '/traaitt-wallet.log', {
    flags: 'a'
});
// set daemon for TRAAITT network
const daemon = new WB.BlockchainCacheApi('main.trrxitte.com', true);
// setup and configure screen instance
let screen = blessed.screen({
    smartCSR: true,
    title: 'TRAAITT Wallet v0.3.0',
    debug: true
});
// run the initial function
drawSplashScreen();
// draw the splash screen window
function drawSplashScreen() {
    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%'
    });
    // draw the window
    let splashWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white'
        }
    });
    // focus the window
    splashWindow.focus();
    // on click for splashwindow
    splashWindow.on('click', function () {
        splashWindow.destroy();
        navBar.destroy();
        drawStartWindow();
    });
    // keyboard commands for PRESS START
    splashWindow.key(['enter'], function (ch, key) {
        splashWindow.destroy();
        navBar.destroy();
        drawStartWindow();
    });
    // x command
    splashWindow.key(['x', 'escape'], function (ch, key) {
        screen.destroy();
        return process.exit(0);
    });
    // append the areas
    screen.append(navBar);
    screen.append(splashWindow);
    // render the X button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        screen.destroy();
        return process.exit(0);
    });
    // set ascii art column
    let splashText = blessed.box({
        parent: splashWindow,
        top: 'center',
        left: 'center',
        width: 55,
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
        }
    });
    // set text fields for start screen
    let asciiArt = blessed.text({
        parent: splashText,
        top: '10%',
        left: 'center',
        width: '100%',
        fg: 'red',
    });
    let welcomeMessage = blessed.text({
        parent: splashText,
        top: '50%',
        left: 'center',
        fg: 'white',
        tags: true
    });
    // set the content of the text fields
    asciiArt.setContent('\n████████▄▄▄▄ ██████╗  █████╗  █████╗ ██╗████████╗████████╗\n' +
        '╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║╚══██╔══╝╚══██╔══╝\n' +
        '   ██║   ██████╔╝███████║███████║██║   ██║      ██║   \n' +
        '   ██║   ██╔══██╗██╔══██║██╔══██║██║   ██║      ██║   \n' +
        '   ██║   ██║  ██║██║  ██║██║  ██║██║   ██║      ██║   \n' +
        '   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝   \n' +
        '              TRAAITT WALLET - XTE                      \n');
    welcomeMessage.setContent('{bold}PRESS START{/}');
    // render the screen
    screen.render();
}
// draw the start window
function drawStartWindow() {
    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    });
    // draw the window
    let startWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    // focus the window
    startWindow.focus();
    // o keypress
    startWindow.key(['o'], function (ch, key) {
        openWalletButton.press();
    });
    // c keypress
    startWindow.key(['c'], function (ch, key) {
        createWalletButton.press();
    });
    // c keypress
    startWindow.key(['i'], function (ch, key) {
        importWalletButton.press();
    });
    startWindow.key(['x', 'escape'], function (ch, key) {
        startWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    });
    // Append our welcomeScreen to the screen.
    screen.append(navBar);
    screen.append(startWindow);
    // create the opening menu
    let startMenu = blessed.form({
        parent: startWindow,
        left: 'center',
        top: '30%',
        width: 15,
        height: 5,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    let startMenuLabel = blessed.text({
        parent: startMenu,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Start Menu'
    });
    // define the close button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        startWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    });
    // define the "open wallet" button
    let openWalletButton = blessed.button({
        parent: startMenu,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 5
        },
        left: 0,
        top: 0,
        content: '(o)pen',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // if open button is pressed
    openWalletButton.on('press', function () {
        startWindow.destroy();
        navBar.destroy();
        drawOpenWindow();
    });
    // define the "create wallet" button
    let createWalletButton = blessed.button({
        parent: startMenu,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 3
        },
        left: 0,
        top: 1,
        content: '(c)reate',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // if create button is pressed
    createWalletButton.on('press', function () {
        startWindow.destroy();
        navBar.destroy();
        drawCreateWindow();
    });
    // define the "import wallet" button
    let importWalletButton = blessed.button({
        parent: startMenu,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 3
        },
        left: 0,
        top: 2,
        content: '(i)mport',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    importWalletButton.on('press', function () {
        startWindow.destroy();
        navBar.destroy();
        drawImportWindow();
    });
    // render screen
    screen.render();
}
// draw the open window
function drawOpenWindow(error) {
    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    });
    // define notification text
    let errorText = blessed.text({
        parent: navBar,
        top: 'center',
        left: 'center',
        fg: 'red'
    });
    if (error !== undefined) {
        errorText.setContent(error.toString());
    }
    // draw the window
    let openWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    openWindow.key(['tab'], function (ch, key) {
        fileName.focus();
    });
    // focus the window
    openWindow.focus();
    // pop focus on click
    openWindow.on('click', function () {
        screen.focusPop();
        openWindow.focus();
    });
    openWindow.key(['tab'], function () {
        fileName.focus();
    });
    // enter keypress
    openWindow.key(['enter'], function (ch, key) {
        openWalletButton.press();
    });
    // exit
    openWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    // append the elements to the screen
    screen.append(openWindow);
    screen.append(navBar);
    //  define close wallet button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        openWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    });
    // define "open wallet" info form
    let openForm = blessed.form({
        parent: openWindow,
        keys: true,
        left: 'center',
        top: '20%',
        width: 35,
        height: 11,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    // open form post handling
    openForm.on('submit', function (data) {
        const error = drawWalletWindow(data.filename, data.password);
        if (error) {
            drawOpenWindow(error);
        }
    });
    let openFormLabel = blessed.text({
        parent: openForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Open a Wallet'
    });
    // define filename textbox label
    let openLabel = blessed.text({
        parent: openForm,
        keys: true,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Filename:'
    });
    // define filename textbox
    let fileName = blessed.textbox({
        parent: openForm,
        name: 'filename',
        mouse: true,
        keys: true,
        vi: false,
        top: 1,
        left: 0,
        width: 33,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    fileName.key(['enter'], function (ch, key) {
        openWalletButton.press();
    });
    fileName.key(['escape'], function () {
        openWindow.focus();
    });
    fileName.on('blur', function () {
        openWindow.focus();
    });
    // pop focus on textbox click
    fileName.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let openPasswordLabel = blessed.text({
        parent: openForm,
        top: 4,
        left: 0,
        fg: 'white',
        content: 'Password:'
    });
    // defind password textbox
    let password = blessed.textbox({
        parent: openForm,
        name: 'password',
        mouse: true,
        keys: true,
        vi: false,
        top: 5,
        left: 0,
        width: 33,
        inputOnFocus: true,
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    password.key(['enter'], function (ch, key) {
        openWalletButton.press();
    });
    password.key(['escape'], function () {
        openWindow.focus();
    });
    password.key(['tab'], function () {
        screen.focusPop();
        openWindow.focus();
    });
    password.on('blur', function () {
        openWindow.focus();
    });
    // pop focus on textbox click
    password.on('click', function () {
        screen.focusPop();
    });
    // define submit button
    let openWalletButton = blessed.button({
        parent: openForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 7,
            right: 7
        },
        left: 0,
        top: 8,
        content: 'open wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // on submit button press
    openWalletButton.on('press', function () {
        screen.focusPop();
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
    });
    // render the screen
    fileName.focus();
    screen.render();
}
// draw the import window
function drawImportWindow(error, form) {
    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    });
    // define notification text
    let errorText = blessed.text({
        parent: navBar,
        top: 'center',
        left: 'center',
        fg: 'red'
    });
    if (error !== undefined) {
        errorText.setContent(error.toString());
    }
    // define transfers button
    let keyNavButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 0,
            right: 0
        },
        left: 11,
        top: '0%',
        content: '(k)eys',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    keyNavButton.on('press', function () {
        importWindow.hide();
        keyWindow.show();
        keyWindow.setFront();
        keyWindow.focus();
        screen.render();
    });
    // define transfers button
    let seedNavButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 0,
            right: 0
        },
        left: 0,
        top: '0%',
        content: '(s)eed',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    seedNavButton.on('press', function () {
        keyWindow.hide();
        importWindow.show();
        importWindow.setFront();
        walletSeed.focus();
        screen.render();
    });
    // draw the window
    let keyWindow = blessed.box({
        parent: screen,
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    keyWindow.hide();
    // pop focus on click
    keyWindow.on('click', function () {
        screen.focusPop();
        keyWindow.focus();
    });
    keyWindow.key(['tab'], function () {
        fileName.focus();
    });
    // enter keypress
    keyWindow.key(['enter'], function (ch, key) {
        keyWalletButton.press();
    });
    // s keypress
    keyWindow.key(['s'], function (ch, key) {
        seedNavButton.press();
    });
    // exit
    keyWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    // exit
    keyWindow.key(['tab'], function (ch, key) {
        spendKey.focus();
    });
    // define "open wallet" info form
    let keyForm = blessed.form({
        parent: keyWindow,
        keys: true,
        left: 'center',
        top: -1,
        width: 42,
        height: 23,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    // open form post handling
    keyForm.on('submit', function (data) {
        const error = importKeyWallet(data.filename, data.password, data.spendKey, data.viewKey, parseInt(data.scanheight));
        if (error) {
            drawImportWindow(error, 'key');
        }
    });
    let keyFormLabel = blessed.text({
        parent: keyForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Import A Wallet'
    });
    // define filename textbox label
    let spendKeyLabel = blessed.text({
        parent: keyForm,
        keys: true,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Private Spend Key:'
    });
    // define filename textbox
    let spendKey = blessed.textbox({
        parent: keyForm,
        name: 'spendKey',
        mouse: true,
        keys: true,
        vi: false,
        top: 1,
        left: 0,
        width: 40,
        height: 3,
        inputOnFocus: true,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // define filename textbox label
    let viewKeyLabel = blessed.text({
        parent: keyForm,
        keys: true,
        top: 4,
        left: 0,
        fg: 'white',
        content: 'Private View Key:'
    });
    // define filename textbox
    let viewKey = blessed.textbox({
        parent: keyForm,
        name: 'viewKey',
        mouse: true,
        keys: true,
        vi: false,
        top: 5,
        left: 0,
        width: 40,
        height: 3,
        inputOnFocus: true,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    spendKey.key(['enter'], function (ch, key) {
        keyWalletButton.press();
    });
    spendKey.key(['escape'], function () {
        keyWindow.focus();
    });
    spendKey.on('blur', function () {
        keyWindow.focus();
    });
    // pop focus on textbox click
    spendKey.on('click', function () {
        screen.focusPop();
    });
    // define filename textbox label
    let keyFilenameLabel = blessed.text({
        parent: keyForm,
        keys: true,
        top: 8,
        left: 0,
        fg: 'white',
        content: 'Filename:'
    });
    // define filename textbox
    let keyFileName = blessed.textbox({
        parent: keyForm,
        name: 'filename',
        mouse: true,
        keys: true,
        vi: false,
        top: 9,
        left: 0,
        width: 40,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    keyFileName.key(['enter'], function (ch, key) {
        keyWalletButton.press();
    });
    keyFileName.key(['escape'], function () {
        keyWindow.focus();
    });
    keyFileName.on('blur', function () {
        keyWindow.focus();
    });
    // pop focus on textbox click
    keyFileName.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let keyPasswordLabel = blessed.text({
        parent: keyForm,
        top: 12,
        left: 0,
        fg: 'white',
        content: 'Password:'
    });
    // defind password textbox
    let keyPassword = blessed.textbox({
        parent: keyForm,
        name: 'password',
        mouse: true,
        keys: true,
        vi: false,
        top: 13,
        left: 0,
        width: 40,
        inputOnFocus: true,
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    keyPassword.key(['enter'], function (ch, key) {
        keyWalletButton.press();
    });
    keyPassword.key(['escape'], function () {
        keyWindow.focus();
    });
    keyPassword.on('blur', function () {
        keyWindow.focus();
    });
    // pop focus on textbox click
    keyPassword.on('click', function () {
        screen.focusPop();
    });
    // define filename textbox label
    let keyScanHeightLabel = blessed.text({
        parent: keyForm,
        keys: true,
        top: 16,
        left: 0,
        tags: true,
        fg: 'white',
        content: 'Scan Height: (optional)'
    });
    // define filename textbox
    let keyScanHeight = blessed.textbox({
        parent: keyForm,
        name: 'scanheight',
        mouse: true,
        keys: true,
        vi: false,
        top: 17,
        left: 0,
        width: 40,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    keyScanHeight.key(['enter'], function (ch, key) {
        keyWalletButton.press();
    });
    keyScanHeight.key(['escape'], function () {
        keyWindow.focus();
    });
    keyScanHeight.key(['tab'], function () {
        screen.focusPop();
        keyWindow.focus();
    });
    keyScanHeight.on('blur', function () {
        keyWindow.focus();
    });
    // pop focus on textbox click
    keyScanHeight.on('click', function () {
        screen.focusPop();
    });
    // define submit button
    let keyWalletButton = blessed.button({
        parent: keyForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 10,
            right: 11
        },
        left: 0,
        top: 20,
        content: 'open wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // on submit button press
    keyWalletButton.on('press', function () {
        screen.focusPop();
        keyForm.submit();
        keyWindow.destroy();
        importWindow.destroy();
        navBar.destroy();
    });
    // draw the window
    let importWindow = blessed.box({
        parent: screen,
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    // pop focus on click
    importWindow.on('click', function () {
        screen.focusPop();
        importWindow.focus();
    });
    importWindow.key(['tab'], function () {
        fileName.focus();
    });
    // enter keypress
    importWindow.key(['enter'], function (ch, key) {
        importWalletButton.press();
    });
    // t keypress
    importWindow.key(['k'], function (ch, key) {
        keyNavButton.press();
    });
    // exit
    importWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    // append the elements to the screen
    screen.append(importWindow);
    screen.append(keyWindow);
    screen.append(navBar);
    //  define close wallet button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        importWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    });
    // define "open wallet" info form
    let importForm = blessed.form({
        parent: importWindow,
        keys: true,
        left: 'center',
        top: 0,
        width: 42,
        height: 22,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    // open form post handling
    importForm.on('submit', function (data) {
        const error = importWallet(data.filename, data.password, data.seed, parseInt(data.scanheight));
        if (error) {
            drawImportWindow(error, 'seed');
        }
    });
    let importFormLabel = blessed.text({
        parent: importForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Import A Wallet'
    });
    // define filename textbox label
    let seedLabel = blessed.text({
        parent: importForm,
        keys: true,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Mnemonic Seed:'
    });
    // define filename textbox
    let walletSeed = blessed.Textarea({
        parent: importForm,
        name: 'seed',
        mouse: true,
        keys: true,
        vi: false,
        top: 1,
        left: 0,
        width: 40,
        inputOnFocus: true,
        height: 6,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    walletSeed.key(['enter'], function (ch, key) {
        importWalletButton.press();
    });
    walletSeed.key(['escape'], function () {
        importWindow.focus();
    });
    walletSeed.on('blur', function () {
        importWindow.focus();
    });
    // pop focus on textbox click
    walletSeed.on('click', function () {
        screen.focusPop();
    });
    // define filename textbox label
    let importLabel = blessed.text({
        parent: importForm,
        keys: true,
        top: 7,
        left: 0,
        fg: 'white',
        content: 'Filename:'
    });
    // define filename textbox
    let fileName = blessed.textbox({
        parent: importForm,
        name: 'filename',
        mouse: true,
        keys: true,
        vi: false,
        top: 8,
        left: 0,
        width: 40,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    fileName.key(['enter'], function (ch, key) {
        importWalletButton.press();
    });
    fileName.key(['escape'], function () {
        importWindow.focus();
    });
    fileName.on('blur', function () {
        importWindow.focus();
    });
    // pop focus on textbox click
    fileName.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let importPasswordLabel = blessed.text({
        parent: importForm,
        top: 11,
        left: 0,
        fg: 'white',
        content: 'Password:'
    });
    // defind password textbox
    let password = blessed.textbox({
        parent: importForm,
        name: 'password',
        mouse: true,
        keys: true,
        vi: false,
        top: 12,
        left: 0,
        width: 40,
        inputOnFocus: true,
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    password.key(['enter'], function (ch, key) {
        importWalletButton.press();
    });
    password.key(['escape'], function () {
        importWindow.focus();
    });
    password.on('blur', function () {
        importWindow.focus();
    });
    // pop focus on textbox click
    password.on('click', function () {
        screen.focusPop();
    });
    // define filename textbox label
    let scanHeightLabel = blessed.text({
        parent: importForm,
        keys: true,
        top: 15,
        left: 0,
        tags: true,
        fg: 'white',
        content: 'Scan Height: (optional)'
    });
    // define filename textbox
    let scanHeight = blessed.textbox({
        parent: importForm,
        name: 'scanheight',
        mouse: true,
        keys: true,
        vi: false,
        top: 16,
        left: 0,
        width: 40,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    scanHeight.key(['enter'], function (ch, key) {
        importWalletButton.press();
    });
    scanHeight.key(['escape'], function () {
        importWindow.focus();
    });
    scanHeight.key(['tab'], function () {
        screen.focusPop();
        importWindow.focus();
    });
    scanHeight.on('blur', function () {
        importWindow.focus();
    });
    // pop focus on textbox click
    scanHeight.on('click', function () {
        screen.focusPop();
    });
    // define submit button
    let importWalletButton = blessed.button({
        parent: importForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 10,
            right: 11
        },
        left: 0,
        top: 19,
        content: 'open wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // on submit button press
    importWalletButton.on('press', function () {
        screen.focusPop();
        importForm.submit();
        importWindow.destroy();
        navBar.destroy();
    });
    // focus the window
    if (form === 'seed' || form === undefined) {
        importWindow.setFront();
        importWindow.focus();
        walletSeed.focus();
    }
    if (form === 'key') {
        importWindow.hide();
        keyWindow.show();
        keyWindow.focus();
    }
    // render the screen
    screen.render();
}
// draw the create window
function drawCreateWindow(error) {
    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    });
    // draw the window
    let createWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    // focus the window
    createWindow.focus();
    createWindow.key(['tab'], function (ch, key) {
        fileName.focus();
    });
    // pop focus on window click
    createWindow.on('click', function () {
        screen.focusPop();
        createWindow.focus();
    });
    createWindow.key(['tab'], function () {
        fileName.focus();
    });
    // enter keypress
    createWindow.key(['enter'], function (ch, key) {
        createWalletButton.press();
    });
    createWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    // define error text
    let errorText = blessed.text({
        parent: createWindow,
        top: '75%',
        left: 'center',
        tags: true,
        fg: 'red',
    });
    // this error is getting passed into the function if there is an error opening a wallet
    if (error) {
        errorText.setContent(error);
    }
    // append elements to screen instance
    screen.append(createWindow);
    screen.append(navBar);
    // define close wallet buton
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        createWindow.destroy();
        drawSplashScreen();
    });
    // define open wallet form
    let createForm = blessed.form({
        parent: createWindow,
        keys: true,
        left: 'center',
        top: '20%',
        mouse: true,
        width: 35,
        height: 11,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    // create form post handling
    createForm.on('submit', function (data) {
        const error = createWallet(data.filename, data.password);
        if (error) {
            drawCreateWindow(error);
        }
    });
    let createMenuLabel = blessed.text({
        parent: createForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Create New Wallet'
    });
    // define filename textbox label
    let createLabel = blessed.text({
        parent: createForm,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Filename:'
    });
    // define filename textbox
    let fileName = blessed.textbox({
        parent: createForm,
        name: 'filename',
        mouse: true,
        keys: true,
        top: 1,
        left: 0,
        width: 33,
        inputOnFocus: true,
        vi: false,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    fileName.focus();
    // enter keypress
    fileName.key(['enter'], function (ch, key) {
        createWalletButton.press();
    });
    fileName.key(['escape'], function () {
        createWindow.focus();
    });
    fileName.on('blur', function () {
        createWindow.focus();
    });
    // pop focus on textbox click
    fileName.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let createPasswordLabel = blessed.text({
        parent: createForm,
        top: 4,
        left: 0,
        fg: 'white',
        content: 'Password:'
    });
    // define password textbox
    let password = blessed.textbox({
        parent: createForm,
        name: 'password',
        mouse: true,
        top: 5,
        left: 0,
        width: 33,
        inputOnFocus: true,
        vi: false,
        keys: true,
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    // enter keypress
    password.key(['enter'], function (ch, key) {
        createWalletButton.press();
    });
    password.key(['escape'], function () {
        createWindow.focus();
    });
    password.key(['tab'], function () {
        screen.focusPop();
        createWindow.focus();
    });
    password.on('blur', function () {
        createWindow.focus();
    });
    // pop focus on textbox click
    password.on('click', function () {
        screen.focusPop();
    });
    // define create form submit button
    let createWalletButton = blessed.button({
        parent: createForm,
        mouse: true,
        keys: true,
        shrink: true,
        tags: true,
        padding: {
            left: 6,
            right: 6
        },
        left: 0,
        top: 8,
        content: 'create wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // on create wallet button press
    createWalletButton.on('press', function () {
        screen.focusPop();
        createForm.submit();
        createWindow.destroy();
        navBar.destroy();
    });
    // render the screen
    screen.render();
}
// draw the wallet window
function drawWalletWindow(fileName, password) {
    ///////////////////////////////////////////////////////////////////
    // WALLET CODE
    ///////////////////////////////////////////////////////////////////
    // define and start the wallet
    const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, walletDirectory + `/${fileName}.wallet`, password);
    if (error) {
        logFile(error);
        return error;
    }
    // delete log file if currently present
    if (fs.existsSync(logDirectory + `${fileName}.log`)) {
        fs.unlinkSync(logDirectory + `${fileName}.log`);
    }
    ;
    // configure logging
    wallet.setLogLevel(WB.LogLevel.DEBUG);
    wallet.setLoggerCallback((prettyMessage, message, level, categories) => {
        let logStream = fs.createWriteStream(logDirectory + '/divinewallet.log', {
            flags: 'a'
        });
        logStream.write(prettyMessage + '\n');
    });
    // start the wallet
    wallet.start();
    // get transaction data
    const txData = wallet.getTransactions();
    const txArray = getRecentTransactions(txData);
    // get the wallet address
    const addressString = wallet.getPrimaryAddress();
    ///////////////////////////////////////////////////////////////////
    // UI CODE
    ///////////////////////////////////////////////////////////////////
    // draw all of the windows
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    });
    let transferWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    transferWindow.hide();
    transferWindow.on('click', function () {
        screen.focusPop();
        transferWindow.focus();
    });
    transferWindow.key(['tab'], function (ch, key) {
        addressInput.focus();
    });
    // t keypress
    transferWindow.key(['s'], function (ch, key) {
        settingsNavButton.press();
    });
    transferWindow.key(['w'], function (ch, key) {
        walletNavButton.press();
    });
    // x keypress
    transferWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    let settingsWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    settingsWindow.hide();
    // t keypress
    settingsWindow.key(['t'], function (ch, key) {
        transferNavButton.press();
    });
    // w keypress
    settingsWindow.key(['w'], function (ch, key) {
        walletNavButton.press();
    });
    // x keypress
    settingsWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    settingsWindow.key(['C-c'], function (ch, key) {
        backupKeys.press();
    });
    // draw the windows
    let walletWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    // x keypress
    walletWindow.key(['x', 'escape'], function (ch, key) {
        closeWalletButton.press();
    });
    walletWindow.key(['C-c'], function (ch, key) {
        addressButton.press();
    });
    // t keypress
    walletWindow.key(['t'], function (ch, key) {
        transferNavButton.press();
    });
    // t keypress
    walletWindow.key(['s'], function (ch, key) {
        settingsNavButton.press();
    });
    // append the elements
    walletWindow.focus();
    screen.append(navBar);
    screen.append(transferWindow);
    screen.append(settingsWindow);
    screen.append(walletWindow);
    ///////////////////////////////////////////////////////////////////
    // NAVIGATION BAR
    ///////////////////////////////////////////////////////////////////
    // render the X button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        left: '97%',
        top: '0%',
        content: '(x)',
        style: {
            bg: 'black',
            fg: 'red',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    // quit on top right button
    closeWalletButton.on('press', function () {
        wallet.saveWalletToFile(walletDirectory + `/${fileName}.wallet`, password);
        wallet.stop();
        walletWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    });
    // define wallet button
    let walletNavButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 1,
            right: 1
        },
        left: 0,
        top: '0%',
        content: '(w)allet',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    walletNavButton.on('press', function () {
        settingsWindow.hide();
        transferWindow.hide();
        walletWindow.show();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
    });
    // define transfers button
    let transferNavButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 0,
            right: 0
        },
        left: 11,
        top: '0%',
        content: '(t)ransfer',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    transferNavButton.on('press', function () {
        walletWindow.hide();
        settingsWindow.hide();
        transferWindow.show();
        transferWindow.setFront();
        addressInput.focus();
        screen.render();
    });
    // define settings button
    let settingsNavButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 0,
            right: 0
        },
        left: 22,
        top: '0%',
        content: '(s)ettings',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    });
    settingsNavButton.on('press', function () {
        walletWindow.hide();
        transferWindow.hide();
        settingsWindow.show();
        settingsWindow.setFront();
        settingsWindow.focus();
        screen.render();
    });
    // define notification text
    let notificationText = blessed.text({
        parent: navBar,
        top: 0,
        left: '50%',
        tags: true,
        fg: 'white',
    });
    ///////////////////////////////////////////////////////////////////
    //  WALLET WINDOW
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////// LEFT COLUMN CODE STARTS HERE
    let leftColumn = blessed.box({
        parent: walletWindow,
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        tags: true,
        border: {
            type: 'line',
            fg: 'white'
        },
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    let leftColumnLabel = blessed.text({
        parent: leftColumn,
        top: -1,
        left: 1,
        fg: 'white',
        tags: true,
        content: '{bold}Balance{/}'
    });
    let leftColumnLabel2 = blessed.text({
        parent: leftColumn,
        top: 3,
        left: 0,
        fg: 'white',
        tags: true,
        content: '{|}ctrl+c: copy address{/}'
    });
    // define the address button
    let addressButton = blessed.button({
        parent: leftColumn,
        mouse: true,
        keys: true,
        shrink: true,
        left: 0,
        top: 0,
        content: addressString,
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'black',
                fg: 'red'
            }
        }
    });
    // on addressbutton click
    addressButton.on('press', async, function () {
        clipboardy.writeSync(addressString);
        notifyUser(notificationText, 'Copied to clipboard!', 500);
        walletWindow.focus();
    });
    // on addressbutton click
    addressButton.on('click', async, function () {
        clipboardy.writeSync(addressString);
        notifyUser(notificationText, 'Copied to clipboard!', 500);
        walletWindow.focus();
    });
    // define the synchronization text label
    let syncStatus = blessed.text({
        parent: leftColumn,
        top: '75%',
        left: 0,
        fg: 'white',
        tags: true
    });
    // define the wallet balance
    let walletBalance = blessed.text({
        parent: leftColumn,
        top: 5,
        left: 0,
        fg: 'white',
        tags: true
    });
    // define balance labels
    let walletBalanceLabels = blessed.text({
        parent: leftColumn,
        top: 5,
        left: 0,
        fg: 'white',
        tags: true
    });
    // set balance labels content
    walletBalanceLabels.setContent(' {bold}Available:{/}\n' +
        ' {bold}{red-fg}Locked:{/}\n' +
        ' Total:');
    // get balance
    let walletBalanceData = wallet.getBalance();
    // set balance content
    walletBalance.setContent(`{|}{bold}${WB.prettyPrintAmount(walletBalanceData[0])}{/} \n` +
        `{|}{bold}{red-fg}${WB.prettyPrintAmount(walletBalanceData[1])}{/} \n` +
        `{|}${WB.prettyPrintAmount(walletBalanceData[1] + walletBalanceData[0])}{/} `);
    //////////////////////////////////// RIGHT COLUMN CODE STARTS HERE
    let rightColumn = blessed.box({
        parent: walletWindow,
        top: 0,
        left: '50%',
        width: '50%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });
    // NOTE: commented out invalid TableOptions
    let transactionTable = contrib.table({
        parent: rightColumn,
        bg: 'black',
        fg: 'white',
        selectedFg: 'white',
        selectedBg: 'black',
        label: 'Recent Transactions',
        width: '100%',
        height: '100%',
        border: {
            type: "line",
            fg: "white"
        },
        columnSpacing: 6,
        columnWidth: [18, 20]
    });
    transactionTable.setData({
        headers: ['Time', 'Amount'],
        data: txArray
    });
    ///////////////////////////////////////////////////////////////////
    //  Settings WINDOW
    //////////////////////////////////////////////////////////////////
    // define the address button
    let backupKeys = blessed.button({
        parent: settingsWindow,
        mouse: true,
        keys: true,
        shrink: true,
        left: 'center',
        top: 'center',
        tags: true,
        content: '{bold}click here or ctrl+c to copy private keys to the clipboard{/}',
        style: {
            bg: 'red',
            fg: 'white',
            hover: {
                bg: 'black',
                fg: 'red'
            }
        }
    });
    // on addressbutton click
    backupKeys.on('click', async, function () {
        const [privateSpendKey, privateViewKey] = wallet.getPrimaryAddressPrivateKeys();
        const [mnenomicSeed] = wallet.getMnemonicSeed();
        const backupMessage = 'Public address:\n' +
            `${addressString}\n\n` +
            'Private view key:\n' +
            `${privateViewKey}\n\n` +
            'Private spend key:\n' +
            `${privateSpendKey}\n\n` +
            'Mnemonic seed:\n' +
            `${mnenomicSeed}`;
        clipboardy.writeSync(backupMessage);
        notifyUser(notificationText, '{bold}{red-fg}PRIVATE KEYS COPIED TO CLIPBOARD{/}', 2000);
        settingsWindow.focus();
    });
    // on addressbutton click
    backupKeys.on('press', async, function () {
        const [privateSpendKey, privateViewKey] = wallet.getPrimaryAddressPrivateKeys();
        const [mnenomicSeed] = wallet.getMnemonicSeed();
        const backupMessage = 'Public address:\n' +
            `${addressString}\n\n` +
            'Private view key:\n' +
            `${privateViewKey}\n\n` +
            'Private spend key:\n' +
            `${privateSpendKey}\n\n` +
            'Mnemonic seed:\n' +
            `${mnenomicSeed}`;
        clipboardy.writeSync(backupMessage);
        notifyUser(notificationText, '{bold}{red-fg}PRIVATE KEYS COPIED TO CLIPBOARD{/}', 500);
        settingsWindow.focus();
    });
    ///////////////////////////////////////////////////////////////////
    //  SYNC BAR
    //////////////////////////////////////////////////////////////////
    let progress = blessed.progressbar({
        parent: walletWindow,
        style: {
            fg: 'red',
            bg: 'default',
            bar: {
                bg: 'default',
                fg: 'red'
            },
            border: {
                fg: 'default',
                bg: 'default'
            }
        },
        ch: ':',
        width: '100%',
        height: 1,
        top: '90%',
        left: '0%',
        filled: 0
    });
    // refresh the sync information every second
    refreshSync(syncStatus, wallet, progress);
    setInterval(refreshSync.bind(null, syncStatus, wallet, progress), 1000);
    ///////////////////////////////////////////////////////////////////
    //  TRANSFER WINDOW
    //////////////////////////////////////////////////////////////////
    // define error text
    let errorText = blessed.text({
        parent: transferWindow,
        top: '75%',
        left: 'center',
        tags: true,
        fg: 'red',
    });
    // create the opening menu
    let transferForm = blessed.form({
        parent: transferWindow,
        keys: true,
        left: 'center',
        top: '5%',
        width: 42,
        height: 15,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });
    transferForm.on('click', function () {
        screen.focusPop();
    });
    // transfer form post handling
    transferForm.on('submit', async, function (data) {
        let paymentID;
        if (data.paymentid === '') {
            paymentID = undefined;
        }
        const [hash, error] = await, wallet, sendTransactionBasic = (data.address, atomicUnits(parseInt(data.amount)), paymentID);
        if (error) {
            logFile(error);
            await;
            notifyUser(errorText, error.toString(), 5000);
            transferForm.reset();
        }
        else {
            transferWindow.hide();
            walletWindow.show();
            walletWindow.setFront();
            walletWindow.focus();
            screen.render();
            await;
            notifyUser(notificationText, `{white-fg}{bold}Sent succesfully!{/bold}`, 3000);
        }
    });
    // define filename textbox label
    let transferFormLabel = blessed.text({
        parent: transferForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Send XTE'
    });
    // define filename textbox label
    let addressLabel = blessed.text({
        parent: transferForm,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Address:'
    });
    // define filename textbox
    let addressInput = blessed.textbox({
        parent: transferForm,
        name: 'address',
        top: 1,
        left: 0,
        width: 40,
        mouse: true,
        inputOnFocus: true,
        height: 3,
        vi: false,
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    addressInput.key('enter', function () {
        transferButton.press();
    });
    addressInput.key(['escape'], function () {
        screen.focusPop();
        transferWindow.focus();
    });
    addressInput.on('blur', function () {
        transferWindow.focus();
    });
    // pop focus on textbox click
    addressInput.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let idLabel = blessed.text({
        parent: transferForm,
        top: 4,
        left: 0,
        fg: 'white',
        tags: true,
        content: 'Payment ID: (optional)'
    });
    // defind password textbox
    let idInput = blessed.textbox({
        parent: transferForm,
        name: 'paymentid',
        top: 5,
        left: 0,
        width: 40,
        mouse: true,
        vi: false,
        inputOnFocus: true,
        height: 3,
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    idInput.key('enter', function () {
        transferButton.press();
    });
    idInput.key(['escape'], function () {
        screen.focusPop();
        transferWindow.focus();
    });
    idInput.on('blur', function () {
        transferWindow.focus();
    });
    // pop focus on textbox click
    idInput.on('click', function () {
        screen.focusPop();
    });
    // define password textbox label
    let amountLabel = blessed.text({
        parent: transferForm,
        top: 8,
        left: 0,
        fg: 'white',
        content: 'Amount:'
    });
    // defind password textbox
    let amountInput = blessed.textbox({
        parent: transferForm,
        name: 'amount',
        top: 9,
        left: 0,
        width: 20,
        mouse: true,
        vi: false,
        inputOnFocus: true,
        height: 3,
        border: {
            type: 'line',
            fg: 'white'
        },
        fg: 'white',
    });
    amountInput.key('enter', function () {
        transferButton.press();
    });
    amountInput.key(['escape'], function () {
        screen.focusPop();
        transferWindow.focus();
    });
    amountInput.key(['tab'], function () {
        screen.focusPop();
        transferWindow.focus();
    });
    amountInput.on('blur', function () {
        transferWindow.focus();
    });
    // pop focus on textbox click
    idInput.on('click', function () {
        screen.focusPop();
    });
    let availableBalanceText = blessed.text({
        parent: transferForm,
        top: 9,
        left: 21,
        fg: 'white',
        tags: true,
        content: `{bold}Available:{/}\n${WB.prettyPrintAmount(walletBalanceData[0])}`
    });
    // define submit button
    let transferButton = blessed.button({
        parent: transferForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 14,
            right: 14
        },
        left: 0,
        top: 12,
        content: 'send (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });
    // on send transfer button press
    transferButton.on('press', function () {
        screen.focusPop();
        transferForm.submit();
        transferForm.reset();
    });
    // on transaction
    wallet.on('transaction', async, function () {
        notifyUser(notificationText, 'New transation found!', 2000);
        // get wallet data and set it in walletBalance
        let updateBalance = wallet.getBalance();
        walletBalance.setContent(`{|}{bold}${WB.prettyPrintAmount(updateBalance[0])}{/}\n` +
            `{|}{bold}{red-fg}${WB.prettyPrintAmount(updateBalance[1])}{/}\n` +
            `{|}${WB.prettyPrintAmount(updateBalance[1] + updateBalance[0])}`);
        let updateTransactionList = wallet.getTransactions();
        const updateTxArray = getRecentTransactions(updateTransactionList);
        transactionTable.setData({
            headers: ['Time', 'Amount'],
            data: updateTxArray
        });
        // render the screen
        screen.render();
    });
    // focus window and render screen
    walletWindow.focus();
    screen.render();
    // return undefined if no error
    return undefined;
}
;
// create new wallet and launch it
function createWallet(fileName, password) {
    if (fs.existsSync(walletDirectory + `/${fileName}.wallet`)) {
        return `${fileName}.wallet already exists, will not overwrite.`;
    }
    ;
    const wallet = WB.WalletBackend.createWallet(daemon);
    wallet.saveWalletToFile(walletDirectory + `/${fileName}.wallet`, password);
    wallet.stop();
    drawWalletWindow(fileName, password);
}
;
// imports a wallet by seed and launch it
function importWallet(fileName, password, seed, startHeight) {
    if (fs.existsSync(walletDirectory + `/${fileName}.wallet`)) {
        return `${fileName}.wallet already exists, will not overwrite.`;
    }
    ;
    const [wallet, error] = WB.WalletBackend.importWalletFromSeed(daemon, startHeight, seed);
    if (error) {
        return error;
    }
    wallet.saveWalletToFile(walletDirectory + `/${fileName}.wallet`, password);
    wallet.stop();
    drawWalletWindow(fileName, password);
}
;
// imports a wallet by keys and launch it
function importKeyWallet(fileName, password, spendKey, viewKey, startHeight) {
    if (fs.existsSync(walletDirectory + `/${fileName}.wallet`)) {
        return `${fileName}.wallet already exists, will not overwrite.`;
    }
    ;
    const [wallet, error] = WB.WalletBackend.importWalletFromKeys(daemon, startHeight, viewKey, spendKey);
    if (error) {
        return error;
    }
    wallet.saveWalletToFile(walletDirectory + `/${fileName}.wallet`, password);
    wallet.stop();
    drawWalletWindow(fileName, password);
}
;
// refresh the sync bar
function refreshSync(syncStatus, wallet, progress) {
    // get sync status data
    let [walletHeight, localHeight, networkHeight] = wallet.getSyncStatus();
    /* Since we update the network height in intervals, and we update wallet
    height by syncing, occasionaly wallet height is > network height.
    Fix that here. */
    if (walletHeight > networkHeight && networkHeight !== 0 && networkHeight + 10 > walletHeight) {
        networkHeight = walletHeight;
    }
    /* if the wallet has been synced in the past, the wallet will sometimes display
    currentHeight / 0, so if networkHeight is 0 set it equal to block height */
    if (networkHeight === 0 && walletHeight !== 0) {
        networkHeight = walletHeight;
    }
    // Don't divide by zero 
    let syncFill = networkHeight === 0 ? 0 : walletHeight / networkHeight;
    let percentSync = 100 * syncFill;
    // Prevent bar looking full when it's not 
    if (syncFill > 0.97 && syncFill < 1) {
        syncFill = 0.97;
    }
    // Prevent 100% when just under 
    if (percentSync > 99.99 && percentSync < 100) {
        percentSync = 99.99;
    }
    syncStatus.setContent(` {bold}Status:{/}{|}{red-fg}${walletHeight}{/red-fg} of{/bold} ${networkHeight} \n` +
        `{|}${percentSync.toFixed(2)}% `);
    progress.setProgress(percentSync);
    screen.render();
}
;
// convert atomic units to human readable amount
function humanReadable(amount) {
    return (amount / 100).toFixed(2);
}
;
// convert human readable amounts to atomic units
function atomicUnits(amount) {
    return (amount * 100);
}
;
// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
;
// get transactions list for recent transactions table
function getRecentTransactions(walletData) {
    let amountArray = [];
    for (const tx of walletData) {
        amountArray.push([convertTimestamp(tx.timestamp), numberWithCommas(humanReadable(tx.totalAmount()))]);
    }
    return amountArray;
}
;
// convert unix timestamp into human readable
function convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000), yyyy = d.getFullYear(), mm = ('0' + (d.getMonth() + 1)).slice(-2), dd = ('0' + d.getDate()).slice(-2), hh = ('0' + d.getHours()).slice(-2), min = ('0' + d.getMinutes()).slice(-2), time;
    // ie: 2013-02-18, 16:35
    time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
    return time;
}
;
// lot to divinewallet.log
function logFile(data) {
    walletLogStream.write(`${convertTimestamp(Date.now())} ${data} \n`);
}
;
async;
function notifyUser(notificationArea, message, wait) {
    notificationArea.setContent(message);
    screen.render();
    // wait .5s and destroy the notification text
    await;
    sleep(wait);
    notificationArea.setContent('');
    screen.render();
}
;
// function to format numbers with commas like currency
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
;
