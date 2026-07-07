
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

app = Flask(__name__)

# Configurações do MySQL
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "reportiforio"

mysql = MySQL(app)

@app.route("/", methods=["GET"])
def home():
    return "Backend do TCC funcionando!"

# Rotas para usuários
@app.route("/api/usuarios/registrar", methods=["POST"])
def registrar_usuario():
    msg = ""
    if request.method == "POST" and "nome" in request.json and "email" in request.json and "senha" in request.json:
        nome = request.json["nome"]
        email = request.json["email"]
        senha = request.json["senha"]

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        account = cursor.fetchone()

        if account:
            msg = "A conta já existe!"
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            msg = "Endereço de e-mail inválido!"
        elif not nome or not senha or not email:
            msg = "Por favor, preencha o formulário!"
        else:
            # Inserir novo usuário
            cursor.execute("INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)", (nome, email, senha))
            mysql.connection.commit()
            msg = "Você foi registrado com sucesso!"
    elif request.method == "POST":
        msg = "Por favor, preencha o formulário!"
    return jsonify({"message": msg})

@app.route("/api/usuarios/login", methods=["POST"])
def login_usuario():
    msg = ""
    if request.method == "POST" and "email" in request.json and "senha" in request.json:
        email = request.json["email"]
        senha = request.json["senha"]

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM usuarios WHERE email = %s AND senha = %s", (email, senha,))
        account = cursor.fetchone()

        if account:
            msg = "Logado com sucesso!"
            return jsonify({"message": msg, "user": account})
        else:
            msg = "Nome de usuário/senha incorretos!"
    return jsonify({"message": msg})

# Rotas para jogos
@app.route("/api/jogos", methods=["GET"])
def get_jogos():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM jogos")
    jogos = cursor.fetchall()
    return jsonify(jogos)

@app.route("/api/jogos/<int:jogo_id>", methods=["GET"])
def get_jogo(jogo_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM jogos WHERE id = %s", (jogo_id,))
    jogo = cursor.fetchone()
    if jogo:
        return jsonify(jogo)
    return jsonify({"message": "Jogo não encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
