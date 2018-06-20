cmake_minimum_required(VERSION 3.0.0)
project(harper-server VERSION 0.1.0)

find_package(cpprestsdk REQUIRED)

add_executable(harper-server src/main.cpp)
target_include_directories(harper-server PRIVATE src/)
target_link_libraries(harper-server PUBLIC cpprestsdk::cpprest)
