import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Table,
  Image,
  Container,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import axios from "axios";

import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({
    ID_Categoria: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Imagen: null,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef();

  const [categorias, setCategorias] = useState([]);
  const [searchCategoryTerm, setSearchCategoryTerm] = useState("");

  const handleCategorySearchChange = (e) => {
    setSearchCategoryTerm(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/categoria/read")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => console.error("Error al cargar categorías", error));
  }, []);

  useEffect(() => {
    reloadMenuData();
  }, []);

  useEffect(() => {
    const performFilter = () => {
      if (searchTerm) {
        const filtered = data.filter(
          (item) =>
            item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };
    performFilter();
  }, [searchTerm, data]);

  const reloadMenuData = () => {
    axios.get("http://localhost:5000/menu/read").then((response) => {
      setData(response.data);
      setFilteredData(response.data);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({ ...formData, Imagen: reader.result.split(",")[1] });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.ID_Categoria) {
      formIsValid = false;
      tempErrors["ID_Categoria"] = "ID de categoría es requerido";
    }

    if (!formData.Nombre) {
      formIsValid = false;
      tempErrors["Nombre"] = "El nombre es requerido";
    } else if (formData.Nombre.length > 100) {
      formIsValid = false;
      tempErrors["Nombre"] = "El nombre no puede superar los 100 caracteres";
    }

    if (!formData.Descripcion) {
      formIsValid = false;
      tempErrors["Descripcion"] = "La descripción es requerida";
    } else if (formData.Descripcion.length > 200) {
      formIsValid = false;
      tempErrors["Descripcion"] =
        "La descripción no puede superar los 200 caracteres";
    }

    if (!formData.Precio) {
      formIsValid = false;
      tempErrors["Precio"] = "El precio es requerido";
    } else if (isNaN(parseFloat(formData.Precio))) {
      formIsValid = false;
      tempErrors["Precio"] = "El precio debe ser numérico";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando enviar formulario", formData);

    if (validateForm()) {
      console.log("Formulario validado correctamente");
      if (window.confirm("¿Está seguro que desea guardar este menú?")) {
        axios
          .post("http://localhost:5000/menu/create", formData)
          .then((response) => {
            console.log("Respuesta del servidor", response);
            alert("Menú guardado con éxito!");
            reloadMenuData();
            resetForm();
          })
          .catch((error) => {
            console.error("Error al guardar el menú", error);
            alert("Ocurrió un error al guardar el menú.");
          });
      }
    } else {
      console.log("Errores en el formulario", errors);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (window.confirm("¿Está seguro que desea actualizar este menú?")) {
        axios
          .put(
            `http://localhost:5000/menu/update/${currentItem.ID_Menu}`,
            formData
          )
          .then((response) => {
            alert("Menú actualizado con éxito!");
            reloadMenuData();
            setIsEditing(false);
            resetForm();
          });
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este menú?")) {
      axios
        .delete(`http://localhost:5000/menu/delete/${id}`)
        .then((response) => {
          alert("Menú eliminado con éxito!");
          reloadMenuData();
        });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      ID_Categoria: "",
      Nombre: "",
      Descripcion: "",
      Precio: "",
      Imagen: null,
    });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors({});
    setIsEditing(false);
    setCurrentItem(null);
    setSearchCategoryTerm(""); // Agrega esta línea
  };

  const handleEdit = (item) => {
    const previewImage = `data:image/png;base64,${item.ImagenBase64}`;
    setPreviewUrl(previewImage);
    setFormData({
      ...item,
      Imagen: item.ImagenBase64,
    });
    setIsEditing(true);
    setCurrentItem(item);
  };

  const filteredCategorias = searchCategoryTerm
    ? categorias.filter((categoria) =>
        categoria.Nombre.toLowerCase().includes(
          searchCategoryTerm.toLowerCase()
        )
      )
    : categorias;

  useEffect(() => {
    if (searchCategoryTerm) {
      const matchedCategory = categorias.find((categoria) =>
        categoria.Nombre.toLowerCase().includes(
          searchCategoryTerm.toLowerCase()
        )
      );

      if (matchedCategory) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ID_Categoria: matchedCategory.ID_Categoria,
        }));
      }
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, ID_Categoria: "" }));
    }
  }, [searchCategoryTerm, categorias]);

  return (
    <div className=".body-content">
      <Container className=".mt-custom">
        <Card>
          <Card.Body>
            <Card.Title>Gestión de Menú</Card.Title>
            <Form onSubmit={isEditing ? handleUpdate : handleSubmit}>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group controlId="formCategorySearch">
                    <Form.Label>Buscar Categoría</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Buscar Categoría"
                      onChange={handleCategorySearchChange}
                      value={searchCategoryTerm}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group controlId="formCategoryID">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                      name="ID_Categoria"
                      value={formData.ID_Categoria}
                      onChange={handleChange}
                      isInvalid={!!errors.ID_Categoria}
                    >
                      <option value="">Seleccione una categoría</option>
                      {filteredCategorias.map((categoria) => (
                        <option
                          key={categoria.ID_Categoria}
                          value={categoria.ID_Categoria}
                        >
                          {categoria.Nombre}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.ID_Categoria}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="Nombre"
                      value={formData.Nombre}
                      onChange={handleChange}
                      maxLength={100}
                      isInvalid={!!errors.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="Descripcion"
                      value={formData.Descripcion}
                      onChange={handleChange}
                      isInvalid={!!errors.Descripcion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Descripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12} md={4}>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="Precio"
                      value={formData.Precio}
                      onChange={handleChange}
                      isInvalid={!!errors.Precio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Precio}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group controlId="formImage">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group
                    controlId="formImagePreview"
                    className="mt-3 mb-3"
                  >
                    <Form.Label className="d-block text-center">
                      Vista Previa
                    </Form.Label>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ border: "1px solid #ddd", height: "128px" }}
                    >
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Vista previa"
                          thumbnail
                          style={{ maxWidth: "128px", maxHeight: "128px" }}
                        />
                      )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col
                  sm={12}
                  className="text-center"
                  style={{ marginTop: "-4rem", marginBottom: "1rem" }}
                >
                  <Button variant="primary" type="submit" className="me-2">
                    {isEditing ? "Actualizar" : "Guardar"}
                  </Button>
                  <Button variant="secondary" onClick={resetForm}>
                    Limpiar
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col sm={12}>
                <Form.Group
                  controlId="formSearch"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>Buscar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre o descripción"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>ID Menú</th>
                      <th style={{ textAlign: "center" }}>Categoría</th>
                      <th style={{ textAlign: "center" }}>Nombre</th>
                      <th style={{ textAlign: "center" }}>Descripción</th>
                      <th style={{ textAlign: "center" }}>Precio</th>
                      <th style={{ textAlign: "center" }}>Imagen</th>
                      <th style={{ textAlign: "center" }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.ID_Menu}>
                        <td>{item.ID_Menu}</td>
                        <td>{item.NombreCategoria}</td>{" "}
                        {/* Asumiendo que tienes una columna NombreCategoria */}
                        <td>{item.Nombre}</td>
                        <td>{item.Descripcion}</td>
                        <td>{item.Precio}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              src={`data:image/png;base64,${item.ImagenBase64}`}
                              style={{ width: "64px", height: "64px" }}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              style={{ margin: "5px", padding: "4px 8px" }}
                              variant="warning"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit size={32} />
                            </Button>
                            <Button
                              style={{ margin: "5px", padding: "4px 8px" }}
                              variant="danger"
                              onClick={() => handleDelete(item.ID_Menu)}
                            >
                              <FaTrash size={32} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
