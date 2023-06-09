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

    register_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[text()='Registrar Usuario']"))
    )

    #    PRUEBA 1 ERROR DE CEDULA Y CORREO
    # Hacer clic en el botón de registro
    register_button.click()

    # Esperar a que aparezca el formulario de registro modal
    register_modal = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "exampleModal"))
    )

    # Rellenar el formulario con los datos necesarios
    first_name_input = register_modal.find_element(By.NAME, "first_name")
    first_name_input.send_keys("Maria")

    last_name_input = register_modal.find_element(By.NAME, "last_name")
    last_name_input.send_keys("Mendez")

    email_input = register_modal.find_element(By.NAME, "email")
    email_input.send_keys("correo.invalido@gmail.com")

    phone_number_input = register_modal.find_element(By.NAME, "phone_number")
    phone_number_input.send_keys("112333")

    identification_type_input = register_modal.find_element(By.NAME, "identification_type")
    identification_type_input.send_keys("Cédula")

    groups_input = register_modal.find_element(By.NAME, "groups")
    groups_input.send_keys("Cliente") 

    identification_number_input = register_modal.find_element(By.NAME, "identification_number")
    identification_number_input.send_keys("1234")

    birth_date_input = register_modal.find_element(By.NAME, "birth_date")
    birth_date_input.send_keys("25/03/1996")   
    espera
    espera  
    submit_button = register_modal.find_element(By.XPATH, "//button[text()='Crear cuenta']")
    submit_button.click()   
    # success_message = WebDriverWait(driver, 10).until(
    #     EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'Registro Fallido')]"))
    # )
    error_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[text()='Aceptar']"))
    )
    # Hacer clic en el botón de registro
    error_button.click()

    print("Prueba Funcional 1: Errores de Cedula y Correo")

    # PRUEBA 2 ERRORES DE FECHA Y NUMERO DE TELEFONO

    # Hacer clic en el botón de registro
    register_button.click()   

    # Esperar a que aparezca el formulario de registro modal
    register_modal = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "exampleModal")) 
    )
    # Rellenar el formulario con los datos necesarios
    first_name_input = register_modal.find_element(By.NAME, "first_name")
    first_name_input.clear()
    first_name_input.send_keys("Maria")

    last_name_input = register_modal.find_element(By.NAME, "last_name")
    last_name_input.clear()
    last_name_input.send_keys("Mendez")

    email_input = register_modal.find_element(By.NAME, "email")
    email_input.clear()
    email_input.send_keys("marimendez@email.com")

    phone_number_input = register_modal.find_element(By.NAME, "phone_number")
    phone_number_input.clear()
    phone_number_input.send_keys("3102581")

    identification_type_input = register_modal.find_element(By.NAME, "identification_type")
    #identification_type_input.clear()
    identification_type_input.send_keys("Cédula")

    groups_input = register_modal.find_element(By.NAME, "groups")
    #groups_input.clear()
    groups_input.send_keys("Cliente") 

    identification_number_input = register_modal.find_element(By.NAME, "identification_number")
    identification_number_input.clear()
    identification_number_input.send_keys("74512")

    birth_date_input = register_modal.find_element(By.NAME, "birth_date")
    #birth_date_input.clear()
    birth_date_input.send_keys("25/03/2020")
  
    submit_button = register_modal.find_element(By.XPATH, "//button[text()='Crear cuenta']")
    submit_button.click()

    # Esperar a que se muestre el mensaje de éxito o error
    # success_message = WebDriverWait(driver, 10).until(
    #     EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'Registro Exitoso')]"))
    # )

    espera
    espera
    error_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[text()='Aceptar']"))
    )

    # Hacer clic en el botón de registro
    error_button.click()

    print("Prueba Funcional 2: Errores de Telefono y Fecha de Nacimiento")



   



    # PRUEBA DE REGISTRO EXITOSA CON TODOS LOS CAMPOS VALIDOS
    # Hacer clic en el botón de registro
    register_button.click()   

    # Esperar a que aparezca el formulario de registro modal
    register_modal = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "exampleModal")) 
    )
    # Rellenar el formulario con los datos necesarios
    first_name_input = register_modal.find_element(By.NAME, "first_name")
    first_name_input.clear()
    first_name_input.send_keys("Maria")

    last_name_input = register_modal.find_element(By.NAME, "last_name")
    last_name_input.clear()
    last_name_input.send_keys("Mendez")

    email_input = register_modal.find_element(By.NAME, "email")
    email_input.clear()
    email_input.send_keys("marimendez@email.com")

    phone_number_input = register_modal.find_element(By.NAME, "phone_number")
    phone_number_input.clear()
    phone_number_input.send_keys("3102581012")

    identification_type_input = register_modal.find_element(By.NAME, "identification_type")
    #identification_type_input.clear()
    identification_type_input.send_keys("Cédula")

    groups_input = register_modal.find_element(By.NAME, "groups")
    #groups_input.clear()
    groups_input.send_keys("Cliente") 

    identification_number_input = register_modal.find_element(By.NAME, "identification_number")
    identification_number_input.clear()
    identification_number_input.send_keys("74512563")

    birth_date_input = register_modal.find_element(By.NAME, "birth_date")
    #birth_date_input.clear()
    birth_date_input.send_keys("25/03/1996")
  
    submit_button = register_modal.find_element(By.XPATH, "//button[text()='Crear cuenta']")
    submit_button.click()

    # Esperar a que se muestre el mensaje de éxito o error
    
    error_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[text()='Aceptar']"))
    )

    # Hacer clic en el botón de registro
    error_button.click()

    espera
    espera

    print("Prueba Funcional 3: Prueba Funcional con Datos Correctos")

    # Espera a que aparezca el correo electrónico en cualquier celda de la tabla
    success_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, f"//td[contains(text(), '{email_input.get_attribute('value')}')]"))
    )

    # wait = WebDriverWait(driver, 10)
    # wait.until(EC.text_to_be_present_in_element_value((By.XPATH, "//*"), "Texto específico"))

    # # Envía un mensaje cuando se encuentra el texto específico
    # print("El texto específico ha sido encontrado.")
    

    # # Obtener el texto del mensaje de éxito o error
    # message_text = success_message.text
    # print(message_text)

else:
    print('El inicio de sesión falló')

# Cierra el navegador
driver.quit()
