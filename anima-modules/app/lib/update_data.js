module.exports = function(session) {
    var email = "dev-null";
    if (session.data) if (session.data[0]) if (session.data[0].answer) email = session.data[0].answer;

    var dir = ß.CWD + "/answers/" + ß.date();
    ß.fs.ensureDir(dir, function(err) {
        if (err) return đ(err);
        ß.fs.writeJson(dir + "/" + email + ".json", parameters);
    });
};
