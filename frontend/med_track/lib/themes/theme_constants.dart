import 'package:flutter/material.dart';

class ThemeClass {
  Color lightPrimary = const Color(0xFFF5F5F5);
  Color accent1 = const Color(0xFF4A90E2);
  Color accent2 = const Color(0xFF50E3C2);
  Color darkPrimary = const Color(0xFF333333);

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: const ColorScheme.light().copyWith(
      primary: _colors.lightPrimary,
    ),
    scaffoldBackgroundColor: _colors.lightPrimary,
    appBarTheme: AppBarTheme(
      backgroundColor: _colors.lightPrimary,
      titleTextStyle: TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.bold,
        color: _colors.accent2,
      ),
      iconTheme: IconThemeData(
        color: _colors.accent2
      ),
      centerTitle: false
    ),
  );

  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: const ColorScheme.dark().copyWith(
      primary: _colors.darkPrimary,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: _colors.accent2,
      titleTextStyle: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: _colors.darkPrimary,
      ),
      centerTitle: true
    ),
  );
}

ThemeClass _colors = ThemeClass();
