import 'package:flutter/material.dart';
import 'package:med_track/components/medication_button.dart';

class MedicationItem extends StatelessWidget {
  const MedicationItem({
    super.key,
    });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Container(
              margin: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black),
                borderRadius: const BorderRadius.all(Radius.circular(5))
              ),
              child: const SizedBox(
                width: 15,
                height: 15,                
                child: ColoredBox(color: Colors.black, ),
              ),
            ),            
            const Text('08:00 AM'),
            const Expanded(child: SizedBox()),
            const Text('2'),
            const Text('Today')
          ],
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
          child: const Row(
            children: [
              SizedBox(
                width: 5,
                height: 100,
                child: ColoredBox(color: Colors.black),
              ),
              SizedBox(width: 20,),
              MedicationButton()
            ],
          ),
        )
      ],
    );
  }
}