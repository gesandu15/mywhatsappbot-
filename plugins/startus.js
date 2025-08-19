import java.io.*;
import java.net.*;
import java.nio.file.*;
import java.util.Scanner;

public class StatusDownloader {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("📌 Status URL ekak dīma (image/video):");
        String url = scanner.nextLine();

        System.out.println("📝 File type dīma (image/video):");
        String type = scanner.nextLine().toLowerCase();

        if (!type.equals("image") && !type.equals("video")) {
            System.out.println("❌ Only image/video statuses can be downloaded.");
            return;
        }

        String extension = type.equals("image") ? "jpg" : "mp4";
        String fileName = System.currentTimeMillis() + "." + extension;
        Path filePath = Paths.get(fileName);

        try (InputStream in = new URL(url).openStream()) {
            Files.copy(in, filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("📥 තත්වය බාගැනීම සාර්ථකයි! → " + fileName);
        } catch (IOException e) {
            System.out.println("❌ බාගැනීම අසාර්ථකයි.");
            e.printStackTrace();
        }
    }
}
