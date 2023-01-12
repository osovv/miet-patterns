package org.openjfx;

import javafx.scene.image.Image;
import javafx.scene.shape.Rectangle;
import javafx.scene.input.MouseEvent;
import org.openjfx.RealImage;
import javafx.scene.transform.Translate;


public class ProxyImage implements CustomImage {
    private final Image image;
    private Rectangle rectangleImage;
    private RealImage realImage;

    ProxyImage(Image image){
        this.image = image;
        this.rectangleImage = new Rectangle(image.getWidth(), image.getHeight());


        this.rectangleImage.setOnMouseDragged(b -> {
            Translate translate = new Translate();
            translate.setX(b.getX() - this.rectangleImage.getWidth() / 2);
            translate.setY(b.getY() - this.rectangleImage.getHeight() / 2);
            this.rectangleImage.getTransforms().addAll(translate);
        });

        this.rectangleImage.addEventFilter(MouseEvent.MOUSE_PRESSED, c -> {
            if (c.isSecondaryButtonDown()) {
                this.draw();
            }
        });
    }

    public void draw(){
        if(this.realImage == null){
            this.realImage = new RealImage(image, rectangleImage);
        }
        this.realImage.draw();
    }


    public Image getImage() {
        return this.image;
    }
}
