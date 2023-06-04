from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
driver = webdriver.Chrome('/ruta/al/controlador/chromedriver')
driver.get('http://localhost:3000/auth/home')
<selenium.webdriver.common.action_chains.ActionChains object at 0x00000245B67A0460>