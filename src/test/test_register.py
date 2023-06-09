from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
#from views.examples.ModalRegister import ModalRegister


# Configurar Selenium y el navegador (en este caso, utilizaremos Chrome)
driver = webdriver.Chrome()
driver.get("http://localhost:3000/admin/listusers")

modal_register = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, 'ModalRegister'))  # Reemplaza el selector CSS con el selector real de ModalRegister
)
# Encontrar los campos de entrada y el botón de registro
input_nombre = driver.find_element_by_name("first_name")
input_apellido = driver.find_element_by_name("last_name")
input_email = driver.find_element_by_name("email")
input_password = driver.find_element_by_name("password")
boton_registro = driver.find_element_by_xpath("//button[contains(text(), 'Crear cuenta')]")

# Llenar el formulario de registro
input_nombre.send_keys("Nombre de ejemplo")
input_apellido.send_keys("Apellido de ejemplo")
input_email.send_keys("ejemplo@example.com")
input_password.send_keys("contraseña123")

# Hacer clic en el botón de registro
boton_registro.click()

# Esperar a que aparezca la notificación de registro exitoso
espera = WebDriverWait(driver, 10)
elemento_notificacion = espera.until(EC.visibility_of_element_located((By.CLASS_NAME, "nombre-de-clase-de-la-notificacion")))

# Verificar el mensaje de la notificación
assert elemento_notificacion.text == "Registro Exitoso"

# Cerrar el navegador
driver.quit()
