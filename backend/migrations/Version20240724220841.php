<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240724220841 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE adresse_client CHANGE adresse_complement adresse_complement VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67D9F0F341E');
        $this->addSql('DROP INDEX IDX_6EEAA67D9F0F341E ON commande');
        $this->addSql('ALTER TABLE commande DROP id_adresse_facturation');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE adresse_client CHANGE adresse_complement adresse_complement VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE commande ADD id_adresse_facturation INT NOT NULL');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67D9F0F341E FOREIGN KEY (id_adresse_facturation) REFERENCES adresse_client (id_adresse)');
        $this->addSql('CREATE INDEX IDX_6EEAA67D9F0F341E ON commande (id_adresse_facturation)');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
