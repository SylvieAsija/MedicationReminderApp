import 'package:flutter/material.dart';
import 'package:med_track/components/medication_item.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Med Track'),
        actions: const [Text('settings')],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
        Container(
          padding: const EdgeInsets.all(10),
          child: const MedicationItem()
        ),
        Container(
          color: Colors.brown[100],
          padding: const EdgeInsets.all(20),
          child: const Text('Coffee Prefs'),
        ),
      ],)
    );
  }
}