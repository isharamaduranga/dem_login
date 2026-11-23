package com.example.demo.service;

import com.example.demo.dto.ApiMessageResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.SignupRequest;

public interface AuthService {
    ApiMessageResponse signup(SignupRequest request);
    LoginResponse login(LoginRequest request);
}
