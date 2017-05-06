/* Pamiętasz zadanie z 2 tygodnia pt. “Dziedziczenie z klasy EventEmitter”? Kod, który
należało poprawić znajduje się pod tym adresem http://pastebin.com/YEBncx0d. Na pewno
zdążyłeś/aś go już naprawić. Teraz Twoim zadaniem jest przepisanie już działającego kodu,
który zapisany jest w standardzie ES5 tak, aby korzystał z wszystkich możliwych nowości
dostępnych w ES6. Skorzystaj zatem z nowego zapisu class czy z template stringów. Kod
możesz bez obaw testować bezpośrednio np. w najnowszej wersji przeglądarki Chrome
bez użycia żadnych transpilatorów z ES6 do ES5. */
<!doctype html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<title>Przepisanie kodu z ES5 na ES6</title>
</head>
<body>
<script>
function EventEmitter() {
 
    this.events = {};
 
}
 
EventEmitter.prototype.on = function(type, fn) {
 
    if(!type || !fn) return;
 
    this.events[type] = this.events[type] || [];
    this.events[type].push(fn);
 
}
 
EventEmitter.prototype.emit = function(type, data) {
 
    var fns = this.events[type];
 
    if(!fns || !fns.length) return;
 
    for(var i = 0; i < fns.length; i++) {
        fns[i](data);
    }
 
};
 
function Database(url) {
 
    this.url = url;
 
}
 
Database.prototype.connect = function() {
 
    // fikcyjne podłączenie do bazy
 
    this.emit("connect", this.url);
 
}
 
Database.prototype.disconnect = function() {
 
    // fikcyjne zakończenie połączenia z bazą
 
    this.emit("disconnect", this.url);
 
}
 
// Użycie EventEmittera
var ev = new EventEmitter();
 
ev.on("hello", function(message) {
    console.log("Witaj " + message + "!");
});
 
ev.on("hello", function(message) {
    console.log("Siema " + message + ".");
});
 
ev.on("goodbye", function() {
    console.log("Do widzenia!");
});
 
ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nic się nie wydarzy
 
// DO ZROBIENIA!
// Docelowe użycie klasy Database
var db = new Database("db://localhost:3000"); // fikcyjny adres
 
db.on("connect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało ustanowione.");
});
 
db.on("disconnect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało zakończone.");
});
 
db.connect();
 
// po 5 sekundach rozłączamy się
setTimeout(function() {
    db.disconnect();
}, 5000);
</script>
</body>
</html>