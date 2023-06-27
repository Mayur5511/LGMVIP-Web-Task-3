document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const enrolledStudents = document.getElementById("enrolled-students");
  const enrolledStudentsList = document.createElement("ul");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const image = document.getElementById("image").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const skills = Array.from(
      document.querySelectorAll('input[name="skill"]:checked')
    ).map((checkbox) => checkbox.value);

    const student = {
      name,
      age,
      email,
      image,
      phone,
      gender,
      skills,
    };

    displayStudent(student);
    form.reset();
  });

  function displayStudent(student) {
    const li = document.createElement("li");
    li.classList.add("wrapper");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("userDeleteBtn");
    deleteBtn.innerHTML = "x";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    const textInfoContainer = document.createElement("div");
    textInfoContainer.classList.add("textInfoContainer");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");

    const userImage = document.createElement("img");
    userImage.classList.add("userImage");
    userImage.src = student.image;

    const borderWidth = getComputedStyle(li).getPropertyValue("border-left-width");
    const borderSize = parseInt(borderWidth, 10);
    userImage.style.width = `${borderSize}px`;
    userImage.style.height = `${borderSize}px`;

    const nameParagraph = createParagraph("userName", student.name);
    const ageParagraph = createParagraph("infoText", "Age: " + student.age);
    const emailParagraph = createParagraph("infoText", "Email: " + student.email);
    const phoneParagraph = createParagraph("infoText", "Phone: " + student.phone);
    const genderParagraph = createParagraph("infoText", "Gender: " + student.gender);
    const skillsParagraph = createParagraph("infoText", "Skills: " + student.skills.join(", "));

    appendChildren(
      textInfoContainer,
      nameParagraph,
      ageParagraph,
      emailParagraph,
      phoneParagraph,
      genderParagraph,
      skillsParagraph
    );

    appendChildren(imageContainer, userImage);

    appendChildren(li, deleteBtn, textInfoContainer, imageContainer);

    enrolledStudentsList.appendChild(li);
    enrolledStudents.appendChild(enrolledStudentsList);
  }

  function createParagraph(className, text) {
    const paragraph = document.createElement("p");
    paragraph.classList.add(className);
    paragraph.textContent = text;
    return paragraph;
  }

  function appendChildren(parent, ...children) {
    children.forEach((child) => parent.appendChild(child));
  }
});
