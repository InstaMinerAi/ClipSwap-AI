from flask import Flask, render_template, request,  redirect, make_response, flash, url_for

app = Flask(__name__)

def append_to_file(text, filename):
  """fj+
  Appends text to a new line in a txt file.j+

  Args:
      text: The text to append to the file.
      filename: The path to the txt file.
  """
  try:
    with open(filename, "a") as file:
      file.write(text + "\n")
    print(f"Text appended to {filename}")
  except FileNotFoundError:
    print(f"Error: File {filename} not found.")
  except Exception as e:
    print(f"An error occurred: {e}")


@app.route('/')
def home():
    email = request.args.get('email')
    if email:
      print('email', email)
      append_to_file(email, 'emails.txt')
    # print(session.get('user_id'), request.args.get('video_id'))
    return render_template('home.html')     

if __name__=="__main__":
  app.config['SECRET_KEY'] = '''h der8uye gdihergi dfg9dgubgtir58wtu3084t3utwurtpata-t8_(_)(+-0}+-|}_+9g f959+sg80 f8gdfh+ erye8r9+689+5o9+8lo io8;+9i8o;i8o9l+x9e9zawa+9;89'p[]\p[+9'9+'p[8p[p[]p['/pop/p[op[o;ug]]']]]']gjre pgrohtyku4p;o'p['p['p['p[]]]])'''
  print('sfafafasfsaf')
  app.run(debug=True, )