# 🚀 Sentinel SIEM - Security Information and Event Management System

**Sentinel SIEM** is a powerful **Security Information and Event Management (SIEM)** solution that leverages **CQRS and Event-Driven Architecture** for real-time log management, event correlation, and security threat analysis.

## 📖 Project Overview

Sentinel SIEM is a **log management and event monitoring platform** designed to collect, analyze, and detect security threats in distributed systems.  
✅ **Real-time log processing**  
✅ **Event-driven log distribution via RabbitMQ**  
✅ **Instant log searching with Elasticsearch**  
✅ **Large-scale analytical queries with ClickHouse/SQLDB**  
✅ **Secure access with Spring Security & JWT Authentication**

---

## 🚀 Key Features

🔹 **Event-Driven Logging:** Log management through RabbitMQ-based event streaming  
🔹 **CQRS Architecture:** High performance by separating read/write operations  
🔹 **Real-Time Monitoring:** Log search and analysis with Elasticsearch  
🔹 **Advanced Authentication & Authorization:** JWT Authentication + Role-based Access Control  
🔹 **SIEM Dashboard:** Log visualization with a React-based UI  

---

## 🛠️ Technologies Used

| Technology               | Usage                          |
|--------------------------|--------------------------------|
| **Spring Boot**          | Backend development            |
| **Spring Security + JWT** | Authentication & authorization |
| **RabbitMQ**             | Real-time log communication    |
| **Elasticsearch**        | Fast log search & analysis    |
| **ClickHouse / PostgreSQL** | Analytical database for large-scale log storage |
| **React & TypeScript**   | User interface & log dashboard |
| **Docker**               | Containerized development & deployment |

---

## 📦 Installation Backend

```sh
git clone https://github.com/mehmetberkekeceli/sentinel-siem.git
cd sentinel-siem
mvn clean install
java -jar target/sentinel-siem.jar
