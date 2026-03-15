package com.studentclub.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Сюда впишите пароль, который хотите зашифровать
        String rawPassword = "123123";

        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("Оригинальный пароль: " + rawPassword);
        System.out.println("Хэшированный пароль для базы данных: " + encodedPassword);
    }
}