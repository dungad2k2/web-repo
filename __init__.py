from flask import Blueprint, render_template, request, redirect, url_for
from db.models import db, Student

web = Blueprint('web', __name__, template_folder='templates')

@web.route('/')
def index():
    students = Student.query.all()
    return render_template('index.html', students=students)

@web.route('/student/<int:id>')
def detail(id):
    student = Student.query.get_or_404(id)
    return render_template('detail.html', student=student)

@web.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        full_name = request.form['full_name']
        gender = request.form['gender']
        school = request.form['school']
        new_student = Student(full_name=full_name, gender=gender, school=school)
        db.session.add(new_student)
        db.session.commit()
        return redirect(url_for('web.index'))
    return render_template('form.html')

@web.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    student = Student.query.get_or_404(id)
    if request.method == 'POST':
        student.full_name = request.form['full_name']
        student.gender = request.form['gender']
        student.school = request.form['school']
        db.session.commit()
        return redirect(url_for('web.index'))
    return render_template('form.html', student=student)

@web.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return redirect(url_for('web.index'))
