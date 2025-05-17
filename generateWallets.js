const { ethers } = require('ethers');
const fs = require('fs');

// Konfigurasi
const jumlahWallet = 50; // Ganti dengan jumlah wallet yang ingin dibuat
const filePath = 'account.txt';

async function generateWallets() {
    try {
        // Header untuk file
        let content = 'Daftar Wallet dan Private Key:\n\n';
        content += 'No. | Alamat Wallet | Private Key\n';
        content += '----|---------------|---------------------------------------------\n';

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
