from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
# Configura el controlador de Chrome WebDriver (asegúrate de reemplazar la ruta al controlador correcta)
# Ruta al archivo del controlador de Chrome WebDriver
webdriver_service = Service('chromedriver.exe')

# Configura el controlador de Chrome WebDriver utilizando el objeto Service
driver = webdriver.Chrome(service=webdriver_service)

espera = WebDriverWait(driver, 10)
# Abre el navegador y carga la página de inicio de sesión
driver.get('http://localhost:3000/auth/login')  # Reemplaza con la URL real de tu página de inicio de sesión

# Encuentra los elementos de entrada de correo electrónico y contraseña
email_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'mail'))  # Reemplaza con el ID real del campo de correo electrónico
)
password_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'password'))  # Reemplaza con el ID real del campo de contraseña
)

# Ingresa los datos de inicio de sesión
email_input.send_keys('gerente@gmail.com')  # Reemplaza con tu correo electrónico real
password_input.send_keys('1144123145')  # Reemplaza con tu contraseña real

# Envía el formulario de inicio de sesión
password_input.send_keys(Keys.RETURN)

# Espera a que la página se cargue después del inicio de sesión (puedes ajustar el tiempo de espera según sea necesario)
WebDriverWait(driver, 10).until(
    EC.url_contains('/admin/homeadmin')  # Reemplaza '/admin/homeadmin' con la URL real de la página a la que se redirige después del inicio de sesión
)

# Verifica si el inicio de sesión fue exitoso
print(driver.current_url == 'http://localhost:3000/admin/homeadmin')
if 'http://localhost:3000/admin/homeadmin' in driver.current_url:
    print('Inicio de sesión exitoso')
    espera

    # Redirecciona a la ruta '/admin/listusers'
    driver.get('http://localhost:3000/admin/listusers')  # Reemplaza con la URL real de la ruta a la que deseas redirigir después del inicio de sesión
    espera

    # Configurar Selenium y el navegador (en este caso, utilizaremos Chrome)
    # Esperar a que el botón de registro esté visible
    register_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[text()='Registrar Usuario']"))
    )

    # Hacer clic en el botón de registro
    register_button.click()

    # Esperar a que aparezca el formulario de registro modal
    register_modal = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "exampleModal"))
    )

    # Rellenar el formulario con los datos necesarios
    first_name_input = register_modal.find_element(By.NAME, "first_name")
    first_name_input.send_keys("John")

    last_name_input = register_modal.find_element(By.NAME, "last_name")
    last_name_input.send_keys("Doe")

    email_input = register_modal.find_element(By.NAME, "email")
    email_input.send_keys("john.doe@example.com")
    espera
    espera
    espera
    # ... Rellenar los demás campos del formulario según sea necesario

    # Hacer clic en el botón de enviar el formulario
    submit_button = register_modal.find_element(By.XPATH, "//button[text()='Crear cuenta']")
    submit_button.click()

    # Esperar a que se muestre el mensaje de éxito o error
    success_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'Registro Exitoso')]"))
    )

    # Obtener el texto del mensaje de éxito o error
    message_text = success_message.text
    print(message_text)

else:
    print('El inicio de sesión falló')

# Cierra el navegador
driver.quit()
