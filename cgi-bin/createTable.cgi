#!C:/Strawberry/perl/bin/perl.exe
print "Content-type: text/html\n\n";

use DBI;
use strict;

my $driver   = "SQLite";
my $database = "appointment.db";
my $dsn      = "DBI:$driver:dbname=$database";
#my $driver   = "SQLite";
#my $database = "http://localhost/ApexPerl2/DB/myAppointments.db";
#my $dsn      = "DBI:SQLite:databse=\\ApexPerl2\\DB\\appointment.db; host=localhost";
my $userid   = "";
my $password = "";
my $dbh      = DBI->connect( $dsn, $userid, $password, { RaiseError => 1 } )
  or die $DBI::errstr;
print "Opened database successfully\n";

my $query = qq(CREATE TABLE APPOINTMENTS
   (
      DESCRIPTION           TEXT    NOT NULL,
	  APPOINTMENT           DATETIME    NOT NULL
	  
	  
      ););

my $rv = $dbh->do($query);
if ( $rv < 0 ) {
    print $DBI::errstr;
}
else {
    print "Table created successfully\n";
}
$dbh->disconnect();
