var myArray    = [];
    myArray[0] = "1";
    myArray[1] = "2";
    myArray[2] = "3";
    myArray[3] = "4";
    myArray[4] = "5";

document.write("<h1>Table of Phone Numbers</h1><table  border='1'>");
for (var i=0; i<5; i++) {
  document.write("<tr><td>Number " + i + " is:</td>");
  document.write("<td>" + myArray[i] + "</td></tr>");
}
document.write("</table>");
