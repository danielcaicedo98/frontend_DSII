from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configura el controlador de Chrome WebDriver (asegúrate de reemplazar la ruta al controlador correcta)
driver = webdriver.Chrome('/ruta/al/controlador/chromedriver')


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
    EC.url_contains('dashboard')  # Reemplaza 'dashboard' con la URL real de la página a la que se redirige después del inicio de sesión
)

# Verifica si el inicio de sesión fue exitoso
if 'dashboard' in driver.current_url:
    print('Inicio de sesión exitoso')
else:
    print('El inicio de sesión falló')

# Cierra el navegador
driver.quit()
