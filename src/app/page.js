"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, RefreshCw, Info, Shield, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const sanskritWords = [
  "Chaya", "Daya", "Dvesha", "Dhairya", "Ekam", "Ghar", "Gurukulam",
  "Hridaya", "Hita", "Indriya", "Jala", "Kala", "Kamala", "Kanya",
  "Lajja", "Loka", "Madhura", "Maitri", "Manasa", "Mitra",
  "Namaste", "Nidra", "Paani", "Parivara", "Pranaama", "Priya",
  "Raksha", "Rasa", "Sahasra", "Sadhana", "Sandhya", "Shakti",
  "Shraddha", "Sneha", "Suvarna", "Tapa", "Tirtha", "Ushas",
  "Vana", "Vastra", "Vayu", "Vidya", "Vrata", "Yajna", "Yatra",
  "Yukti", "Yuga", "Artha", "Chitta", "Deva"
];

export default function Home() {
  const [password, setPassword] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    // Simple password strength checker
    const checkStrength = (pass) => {
      let score = 0;
      if (pass.length > 6) score++;
      if (pass.length > 10) score++;
      if (/[A-Z]/.test(pass)) score++;
      if (/[0-9]/.test(pass)) score++;
      if (/[^A-Za-z0-9]/.test(pass)) score++;
      setStrength(score);
    };

    checkStrength(password);
  }, [password]);

  const generatePassphrase = () => {
    const randomWord = sanskritWords[Math.floor(Math.random() * sanskritWords.length)];
    const randomWord2 = sanskritWords[Math.floor(Math.random() * sanskritWords.length)];
    const newPassphrase = randomWord + password + randomWord2;
    setPassphrase(newPassphrase);
    setShowAlert(true);

    // Clear the alert after 10 seconds
    setTimeout(() => setShowAlert(false), 10000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generatePassphrase();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">SansCrypt</h1>
        <p className="text-center text-gray-600 mb-6">Enhance your password security with Sanskrit-inspired encryption</p>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              className="w-full pr-10"
            />
            <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength === 0 ? 'w-0' :
                strength === 1 ? 'w-1/5 bg-red-500' :
                  strength === 2 ? 'w-2/5 bg-orange-500' :
                    strength === 3 ? 'w-3/5 bg-yellow-500' :
                      strength === 4 ? 'w-4/5 bg-lime-500' :
                        'w-full bg-green-500'
                }`}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">Password strength: {
            strength === 0 ? 'Very Weak' :
              strength === 1 ? 'Weak' :
                strength === 2 ? 'Fair' :
                  strength === 3 ? 'Good' :
                    strength === 4 ? 'Strong' :
                      'Very Strong'
          }</p>

          <Button
            onClick={generatePassphrase}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Lock className="mr-2 h-4 w-4" /> Encrypt
          </Button>

          {showAlert && (
            <Alert variant="default" className="mt-4">
              <AlertDescription className="font-mono break-all">
                Your passphrase: {passphrase}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 flex items-center text-black">
            <Info className="mr-2 text-black" /> How it works
          </h2>
          <p className="text-sm text-gray-700">
            SansCrypt combines your password with a randomly selected Sanskrit word to create a unique and robust passphrase. This adds an extra layer of security to your existing password.
          </p>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <Shield className="text-indigo-600" />
          <RefreshCw className="text-indigo-600" />
          <Lock className="text-indigo-600" />
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Note: Always use strong, unique passwords for each of your accounts. SansCrypt is an additional layer of security, not a replacement for good password practices.
        </p>
      </motion.div>
    </div>
  );
}
