from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

products = [
    {"id": 1, "name": "Apple", "price": 50, "image": "apple.jpeg"},
    {"id": 2, "name": "Banana", "price": 30, "image": "banana.jpeg"},
    {"id": 3, "name": "Orange", "price": 40, "image": "orange.jpeg"},
    {"id": 4, "name": "Milk", "price": 60, "image": "milk.jpeg"},
    {"id": 5, "name": "Butter", "price": 120, "image": "butter.jpeg"},
]

# cart = { product_id: quantity }
cart = {}

@app.route("/")
def home():
    return render_template("index.html", products=products, cart=cart)

@app.route("/add/<int:pid>")
def add(pid):
    cart[pid] = cart.get(pid, 0) + 1
    return redirect(url_for("home"))

@app.route("/remove/<int:pid>")
def remove(pid):
    if pid in cart:
        cart[pid] -= 1
        if cart[pid] <= 0:
            del cart[pid]
    return redirect(url_for("home"))

@app.route("/cart")
def cart_page():
    items = []
    total = 0

    for p in products:
        if p["id"] in cart:
            qty = cart[p["id"]]
            subtotal = qty * p["price"]
            total += subtotal
            items.append({
                "id": p["id"],
                "name": p["name"],
                "price": p["price"],
                "image": p["image"],
                "qty": qty,
                "subtotal": subtotal
            })

    return render_template("cart.html", items=items, total=total)

@app.route("/checkout")
def checkout():
    cart.clear()
    return redirect(url_for("success"))

@app.route("/success")
def success():
    return render_template("success.html")

if __name__ == "__main__":
    app.run(debug=True)
