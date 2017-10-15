#!C:/Strawberry/perl/bin/perl.exe
print "Content-type: text/html\n\n";

use DBI;
use strict;
use CGI::Carp;    
use CGI;

  # Connect to the database.
#my $database = "http://localhost/ApexPerl2/DB/myAppointments.db";
my $driver   = "SQLite";
my $database = "appointment.db";
my $dsn      = "DBI:$driver:dbname=$database";
#my $dsn      = "DBI:SQLite:databse=appointment.db; host=localhost";
my $userid   = "";
my $password = "";
my $dbh      = DBI->connect( $dsn, $userid, $password, { RaiseError => 1 } )
  or die $DBI::errstr;

my $cgi = CGI->new();   

my $date = $cgi->param('date');
my $time = $cgi->param('time');
my $desc = $cgi->param('desc');

my @time = split( ':', $time );

my @date = split( '/', $date );

my $dt =
    $date[2] . "-"
  . $date[0] . "-"
  . $date[1] . " "
  . $time[0] . ":"
  . $time[1] . ":00";


$desc = "" . $desc;

my $query = "INSERT INTO APPOINTMENTS(DESCRIPTION,APPOINTMENT)
           VALUES ('" . $desc . "','" . $dt . "' );";



my $sth = $dbh->prepare($query);

my $rv = $dbh->do($query) or die $DBI::errstr;

$dbh->disconnect();
print"<META HTTP-EQUIV=refresh CONTENT=\"1;URL=http://localhost/index.html\">\n";
