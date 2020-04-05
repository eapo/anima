module.exports = function(session) {
  
  Ł(session);
  
    if (!session) return;
    if (!session.data) return;
    if (!session.data[0]) return;
    if (session.data[0].answer) return;

    var email = session.data[0].answer;
Ł(email);
    var dir = ß.CWD + "/answers/" + ß.date();
    ß.fs.ensureDir(dir, function(err) {
        if (err) return đ(err);
        ß.fs.writeJson(dir + "/" + email + ".json", session.data);
    });
};
