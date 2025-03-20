package com.encryptanddecrypt.controller;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Cipher;
import java.util.Base64;
import java.security.PrivateKey;
import java.security.PublicKey;

/**
 * EncryptAndDecryptCtrl is a Spring Boot REST controller that provides 
 * APIs for RSA encryption. It generates a public-private key pair, 
 * shares the public key, and encrypts input data using RSA.
 * 
 * Features:
 * - Generates a 2048-bit RSA key pair upon initialization.
 * - Provides an API to retrieve the public key in Base64 format.
 * - Encrypts input data using the public key and returns an encrypted string.
 * 
 * Endpoints:
 * - GET /api/publicKey → Returns the public key.
 * - POST /api/encrypt → Encrypts input data using RSA and returns Base64-encoded output.
 * 
 * Usage:
 * - The public key can be retrieved and used by the frontend to encrypt sensitive data.
 * - The encrypted data can be stored securely or transmitted without exposing raw input.
 * 
 * @author Vamsi Krishna
 * @version 1.0
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class EncryptAndDecryptCtrl {
	private final PublicKey publicKey;
	private final PrivateKey privateKey;

	// Constructor to generate an RSA key pair (public and private keys)
	public EncryptAndDecryptCtrl() throws Exception {
		KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
		keyGen.initialize(2048);
		KeyPair keyPair = keyGen.generateKeyPair();
		this.publicKey = keyPair.getPublic();
		this.privateKey = keyPair.getPrivate();
	}

	 // API endpoint to get the public key in Base64 format.
	@GetMapping("/publicKey")
	public String getPublicKey() {
		return Base64.getEncoder().encodeToString(publicKey.getEncoded());
	}

	// API endpoint to encrypt a given username using the public key.
	@PostMapping("/encrypt")
	public String encrypt(@RequestBody String username) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, publicKey);
		byte[] encryptedBytes = cipher.doFinal(username.getBytes());
		return Base64.getEncoder().encodeToString(encryptedBytes);
	}
	
	  // API endpoint to decrypt an encrypted input using the private key.
    @PostMapping("/decrypt")
    public String decrypt(@RequestBody String encryptedInput) throws Exception {
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedInput);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes);
    }
}
