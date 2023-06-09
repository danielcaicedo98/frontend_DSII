from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests

# Configura el controlador de Chrome WebDriver (asegúrate de reemplazar la ruta al controlador correcta)
driver = webdriver.Chrome('/ruta/al/controlador/chromedriver')

# Abre el navegador y carga la página que contiene el CAPTCHA
driver.get('http://localhost:3000/auth/login')

# Espera a que el CAPTCHA se cargue completamente
WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR, 'iframe[src^="https://www.google.com/recaptcha/api2/anchor"]')))

# Obtiene el valor del parámetro "sitekey" del CAPTCHA
sitekey = driver.find_element(By.CSS_SELECTOR, 'div.g-recaptcha').get_attribute('data-sitekey')

# Envía una solicitud al servicio 2Captcha para resolver el CAPTCHA
api_key = 'tu_api_key_de_2captcha'
response = requests.get(f'http://2captcha.com/in.php?key={api_key}&method=userrecaptcha&googlekey={sitekey}&pageurl={driver.current_url}')
captcha_id = response.text.split('|')[1]

# Espera a que el CAPTCHA se resuelva (puedes ajustar el tiempo de espera según sea necesario)
response = requests.get(f'http://2captcha.com/res.php?key={api_key}&action=get&id={captcha_id}')
while 'CAPTCHA_NOT_READY' in response.text:
    time.sleep(5)
    response = requests.get(f'http://2captcha.com/res.php?key={api_key}&action=get&id={captcha_id}')
captcha_response = response.text.split('|')[1]

# Ingresa la respuesta del CAPTCHA en el campo correspondiente
captcha_input = driver.find_element(By.CSS_SELECTOR, 'textarea.g-recaptcha-response')
captcha_input.send_keys(captcha_response)

# Envía el formulario después de resolver el CAPTCHA
submit_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
submit_button.click()

# Continúa con las acciones necesarias en tu prueba después de que el CAPTCHA se haya completado
# ...

# Cierra el navegador
driver.quit()
