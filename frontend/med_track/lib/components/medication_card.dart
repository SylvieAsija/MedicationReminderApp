import 'package:flutter/material.dart';
import 'package:med_track/components/card_body.dart';
import 'package:med_track/components/card_title.dart';

class MedicationCard extends StatelessWidget {
  const MedicationCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ColoredBox(
          color: const Color(0xFFF5F5F5),
          child: Container(
            padding: const EdgeInsets.all(10),
            child: Image.asset('assets/img/capsule.png',
                  width: 40,
                ),
          ),
        ),
        const SizedBox(width: 10,),
        const Column(
          children: [
            CardTitle('Vitamin B12', Colors.black),
            Row(
              children: [
                CardBody('2'),
                CardBody(' Pills '),
                CardBody('(10 mg)')
              ],
            )
          ],
        ),
        
      ],
    );
  }
}