// start point for dart files
// I hate workflow setup
// This is pain
// Every commit and test prolongs the pain
// Is it too late to make everything in JS
// Really hope it works this time
// MEOW MROW
// If this works I'm gonna be sad
// I think I see the light
import 'package:flutter/material.dart';
import 'dart:async'; 
import 'package:frontend/lib/login_page.dart'; 

void main() => runApp(MaterialApp( 
      debugShowCheckedModeBanner: false, 
      initialRoute: '/', 
      routes: {'/': (context) => Login()}, 
));