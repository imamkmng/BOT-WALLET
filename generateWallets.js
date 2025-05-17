const { ethers } = require('ethers');
const fs = require('fs');
const readline = require('readline');

// Konfigurasi
const filePath = 'account.txt';

async function generateWallets() {
    try {
        // Buat interface untuk membaca input dari terminal
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Minta input jumlah wallet dari pengguna
        const jumlahWallet = await new Promise(resolve => {
            rl.question('Masukkan jumlah wallet yang ingin dibuat: ', answer => {
                resolve(parseInt(answer));
                rl.close();
            });
        });

        // Validasi input
        if (isNaN(jumlahWallet) || jumlahWallet <= 0) {
            console.log('Input tidak valid. Harap masukkan angka positif.');
            return;
        }

        // Header untuk file
        let content = 'Daftar Wallet dan Private Key:\n\n';
        content += 'No. | Alamat Wallet | Private Key\n';
        content += '----|---------------|---------------------------------------------\n';

        console.log(`\nMembuat ${jumlahWallet} wallet...\n`);

        // Generate wallet
        for (let i = 1; i <= jumlahWallet; i++) {
            const wallet = ethers.Wallet.createRandom();
            
            // Format output
            const line = `${i.toString().padEnd(3)} | ${wallet.address} | ${wallet.privateKey}\n`;
            content += line;
            
            console.log(`Wallet ${i} berhasil dibuat: ${wallet.address}`);
        }

        // Simpan ke file
        fs.writeFileSync(filePath, content);
        console.log(`\n${jumlahWallet} wallet berhasil dibuat dan disimpan di ${filePath}`);
    } catch (error) {
        console.error('Terjadi error:', error);
    }
}

// Jalankan fungsi
generateWallets();
