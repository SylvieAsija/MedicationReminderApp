import 'package:flutter/material.dart';
import 'package:med_track/components/medication_card.dart';

class MedicationButton extends StatelessWidget {
  const MedicationButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        border: Border.all()
      ),
      child: const MedicationCard()
    );
  }
}