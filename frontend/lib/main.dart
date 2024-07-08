//main.dart

import 'package:flutter/material.dart';
import 'screens/homescreen.dart';
import 'screens/secondscreen.dart';
import 'screens/medicationinfo.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/second': (context) => const SecondScreen(),
        '/medication_info': (context) => const MedicationInfoScreen(userID: 1),
      },
    );
  }
}
