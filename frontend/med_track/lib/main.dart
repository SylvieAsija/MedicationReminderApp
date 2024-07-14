import 'package:flutter/material.dart';
import 'package:med_track/home.dart';
import 'package:med_track/themes/theme_constants.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Med Track',
      theme: ThemeClass.lightTheme,
      darkTheme: ThemeClass.darkTheme,
      home: const Home()
    );
  }
}