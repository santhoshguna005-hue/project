from flask import Flask, render_template, request, redirect, session
import mysql.connector

app = Flask(__name__)
app.secret_key = "flashcart"

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Santy$2005",
    database="flashcart"
)
cursor = db.cursor(dictionary=True)

@app.route("/")
def index():
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    return render_template("index.html", products=products)

@app.route("/category/<category>")
def category(category):
    cursor.execute(
        "SELECT * FROM products WHERE category=%s", (category,)
    )
    products = cursor.fetchall()
    return render_template(
        "category.html", products=products, category=category
    )

@app.route("/add", methods=["POST"])
def add():
    pid = request.form["product_id"]
    cart = session.get("cart", {})
    cart[pid] = cart.get(pid, 0) + 1
    session["cart"] = cart
    return redirect(request.referrer)

@app.route("/cart")
def cart():
    cart = session.get("cart", {})
    items = []
    total = 0

    for pid, qty in cart.items():
        cursor.execute("SELECT * FROM products WHERE id=%s", (pid,))
        p = cursor.fetchone()
        p["qty"] = qty
        p["subtotal"] = p["price"] * qty
        total += p["subtotal"]
        items.append(p)

    return render_template("cart.html", items=items, total=total)

@app.route("/increase/<pid>", methods=["POST"])
def increase(pid):
    session["cart"][pid] += 1
    session.modified = True
    return redirect("/cart")

@app.route("/decrease/<pid>", methods=["POST"])
def decrease(pid):
    session["cart"][pid] -= 1
    if session["cart"][pid] <= 0:
        del session["cart"][pid]
    session.modified = True
    return redirect("/cart")

@app.route("/checkout")
def checkout():
    session.clear()
    return render_template("success.html")

if __name__ == "__main__":
    app.run(debug=True)
