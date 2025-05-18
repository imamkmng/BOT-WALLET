const { ethers } = require('ethers');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const figlet = require('figlet');

// Konfigurasi
const filePath = 'account.txt';

// Fungsi untuk menampilkan header
function showHeader() {
    console.clear();
    console.log(chalk.cyanBright(figlet.textSync('Multi Wallet', { horizontalLayout: 'full' })));
    console.log(chalk.magentaBright(figlet.textSync('Generator', { horizontalLayout: 'full' })));
    console.log(chalk.yellowBright('Airdrop Newbie by @bangkomeng\n'));
    console.log(chalk.green('=================================================='));
    console.log(chalk.green('🚀  Buat banyak wallet crypto sekaligus dengan mudah!'));
    console.log(chalk.green('==================================================\n'));
}

async function generateWallets() {
    try {
        showHeader();

        // Buat interface untuk membaca input dari terminal
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Minta input jumlah wallet dari pengguna
        const jumlahWallet = await new Promise(resolve => {
            rl.question(chalk.blueBright('🎯 Masukkan jumlah wallet yang ingin dibuat: '), answer => {
                resolve(parseInt(answer));
                rl.close();
            });
        });

        // Validasi input
        if (isNaN(jumlahWallet) || jumlahWallet <= 0) {
            console.log(chalk.red('\n❌ Input tidak valid. Harap masukkan angka positif.'));
            return;
        }

        // Header untuk file
        let content = '=============================================\n';
        content += 'Multi Wallet Generator - Addresses & Private Keys\n';
        content += 'Created by @bangkomeng\n';
        content += `Tanggal: ${new Date().toLocaleString()}\n`;
        content += '=============================================\n\n';

        // Buat array untuk menyimpan wallet info
        const wallets = [];

        console.log(chalk.yellow(`\n🔨 Membuat ${jumlahWallet} wallet...\n`));

        // Progress bar sederhana
        const progressBar = (progress) => {
            const width = 50;
            const filled = Math.round(width * progress);
            const empty = width - filled;
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(chalk.green('[' + '■'.repeat(filled) + ' '.repeat(empty) + `] ${Math.round(progress * 100)}%`));
        };

        // Generate wallet
        for (let i = 1; i <= jumlahWallet; i++) {
            const wallet = ethers.Wallet.createRandom();
            wallets.push({
                address: wallet.address,
                privateKey: wallet.privateKey
            });
            
            console.log(chalk.greenBright(`✅ Wallet ${i} berhasil dibuat: ${wallet.address}`));
            progressBar(i/jumlahWallet);
        }

        // Format output
        content += 'Addresses:\n';
        wallets.forEach(wallet => {
            content += `${wallet.address}\n`;
        });

        content += '\nPrivate Keys:\n';
        wallets.forEach(wallet => {
            content += `${wallet.privateKey}\n`;
        });

        // Simpan ke file
        fs.writeFileSync(filePath, content);
        console.log(chalk.magentaBright(`\n\n🎉 ${jumlahWallet} wallet berhasil dibuat dan disimpan di ${filePath}`));
        console.log(chalk.yellowBright('\n⚠️ Simpan file ini di tempat yang aman! Private key memberikan akses penuh ke wallet Anda!'));
        console.log(chalk.cyanBright('\nFollow @bangkomeng untuk tools keren lainnya!'));
    } catch (error) {
        console.error(chalk.red('\n❌ Terjadi error:'), error);
    }
}

// Install dependencies jika belum ada
function checkDependencies() {
    try {
        require.resolve('chalk');
        require.resolve('figlet');
    } catch (e) {
        console.log(chalk.yellow('Menginstall dependencies tambahan...'));
        const { execSync } = require('child_process');
        execSync('npm install chalk@4 figlet', { stdio: 'inherit' });
    }
}

checkDependencies();
generateWallets();
