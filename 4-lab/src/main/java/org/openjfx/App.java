package org.openjfx;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.transform.Translate;
import javafx.stage.Stage;

public class App extends Application {

    private ProxyImage proxyImage;

    @Override
    public void start(Stage stage) {
        proxyImage = new ProxyImage(new Image("img.jpg"));
        Group group = new Group(proxyImage.rectangleImage);

        stage.setScene(new Scene(group));
        stage.setWidth(1920);
        stage.setHeight(1080);
        stage.setTitle("Proxy");
        stage.show();
    }


    public static void main(String[] args) {
        launch();
    }
}


