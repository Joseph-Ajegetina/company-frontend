const axios = require("axios").default;

// View all employees
const viewall = async (req, res) => {
  let url = process.env.API_URL;
  const { page } = req.query;
  try {
    if (page) {
      url = process.env.API_URL + `/?page=${page}`;
    }
    const employees = await axios.get(url);
    if (employees.data.status === "OK") {
      res.render("home", employees.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const filter = async (req, res) => {
  let searchTerm = req.body.search.toLowerCase();
  let url = process.env.API_URL + `/?filter=${searchTerm}`;
  try {
    const employees = await axios.get(url);
    if (employees.data.status === "OK") {
      res.render("home", {
        employees: employees.data.data,
        search: searchTerm,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete user
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const url = process.env.API_URL + `/${id}`;
    const employees = await axios.delete(url);
    if (employees.data.status === "OK") {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

// Add new user
const create = async (req, res) => {
  const { first_name, last_name, email, phone, birthdate, address } = req.body;

  try {
    const employee = await axios.post(process.env.CREATE_EMPLOYEE, {
      name: first_name,
      surname: last_name,
      email,
      phone,
      dob: birthdate,
      address,
    });
    if (employee.data.status === "OK") {
      res.render("home", { employees: employee.data.data });
    }
  } catch (error) {
    console.log(error);
  }
};

const employeeForm = (req, res) => {
  res.render("new-user");
};

const uploadForm = (req, res) => {
  res.render("upload-form");
};

module.exports = {
  viewall,
  filter,
  remove,
  create,
  uploadForm,
  employeeForm,
};
