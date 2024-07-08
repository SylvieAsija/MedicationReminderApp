// lib/screens/medication_info_screen.dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

class MedicationInfoScreen extends StatefulWidget {
  final int userID;
  const MedicationInfoScreen({super.key, required this.userID});

  @override
  _MedicationInfoScreenState createState() => _MedicationInfoScreenState();
}

class _MedicationInfoScreenState extends State<MedicationInfoScreen> {
  List meds = [];

  @override
  void initState() {
    super.initState();
    fetchMedicationInfo();
  }

  Future<void> fetchMedicationInfo() async {
    try {
      // print('${widget.userID}');
      // print(
      //    'Fetching data from: http://192.168.2.14:8000/api/medication_info/${widget.userID}/');
      final response = await http.get(Uri.parse(
          'http://192.168.2.14:8000/api/medication_info/${widget.userID}/'));
      // print('Response status code: ${response.statusCode}');
      // print('Response body: ${response.body}');
      if (response.statusCode == 200) {
        setState(() {
          meds = json.decode(response.body);
        });
      } else {
        throw Exception(
            'Failed to load medication info: ${response.statusCode}');
      }
    } catch (e) {
      // print('Error fetching medication info: $e');
      // Handle error state or display an error message to the user
    }
  }

  String convertTo12HourFormat(String time24) {
    // Example: time24 = "22:00"
    final time = DateFormat.Hm().parse(time24); // Parse the time
    return DateFormat('h:mm a').format(time); // Format to 12-hour with AM/PM
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Medication Info'),
      ),
      body: ListView.builder(
        itemCount: meds.length,
        itemBuilder: (context, index) {
          List<String> reminderTimes = [];
          // Extract reminder times
          meds[index]['medication_time'].forEach((key, value) {
            if (key == 'reminder_time') {
              reminderTimes.add(convertTo12HourFormat(value));
            }
          });
          return ListTile(
              title: Text('Medication Name: ${meds[index]['medication_name']}'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Dosage: ${meds[index]['dosage']}'),
                  Text('Medication Time: ${reminderTimes.join(", ")}'),
                  Text('Frequency: ${meds[index]['frequency']}'),
                  Text('Instructions: ${meds[index]['misc_information']}')
                ],
              ));
        },
      ),
    );
  }
}
